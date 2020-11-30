const { STRING, TEXT } = require('sequelize');
const Sequelize = require('sequelize');
const faker = require('faker');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db');

const User = conn.define('user', {
    name: STRING,
    bio: TEXT
})

User.addHook('beforeCreate', (user, options) => {
    if(!user.bio){
        user.bio = faker.lorem.paragraphs(3);
    }
})

User.createWithName = (name) => User.create({ name });



const syncAndSeed = async() => {
    await conn.sync({ force: true });
    const [moe, lucy, curly] = await Promise.all(
        ['moe', 'lucy', 'curly'].map(User.createWithName)
    );
}

module.exports = {
    models: {
        User
    },
    syncAndSeed
}

