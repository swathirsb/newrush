require('dotenv-flow').config();
const RushGamerzClient = require('./Structures/RushGamerzClient');
const config = {
    prefix: process.env.PREFIX,
    token: process.env.TOKEN
}

const client = new RushGamerzClient(config);
client.start()