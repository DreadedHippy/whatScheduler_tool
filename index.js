const qrcode = require('qrcode-terminal')
const { Client, LocalAuth } = require('whatsapp-web.js');
const nodeCron = require('node-cron');

// const url = 'https://www.linkedin.com/jobs/search/?currentJobId=3364459444&geoId=105693087&keywords=web%20developer&location=Lagos%2C%20Lagos%20State%2C%20Nigeria&refresh=true'

// Use the saved values
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    client.getChats().then( chats => {
        const myGroup = chats.find((chat) => chat.name === 'Whatsapp');
        client.sendMessage(
            myGroup.id._serialized, 'Hello from the other side!'
        )
        let position = 1
        const job = nodeCron.schedule("*/30 * * * *", () => {
            client.sendMessage(
                myGroup.id._serialized, `Hello, this is a scheduled message(position ${position})!`
            )
            position++
        });
    })
});

client.on('message', message => {
	console.log(message.body);
}); 

client.initialize();