const qrcode = require('qrcode-terminal')
const { Client, LocalAuth } = require('whatsapp-web.js');
const nodeCron = require('node-cron');
const scraper = require('./backend/tools/scraper');
require('dotenv').config()


let isReady = false
const mainGroupName = process.env.MAIN_GROUP_NAME
const testGroupName = 'Whatsapp'

// Use the saved values
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
	console.log('Client is ready!');
	isReady = true
	client.getChats().then( chats => {
		const myGroup = chats.find((chat) => chat.name === testGroupName);
		client.sendMessage(
			myGroup.id._serialized, 'Hello from the other side!'
		)

		let position = 0

		scraper.jobs.then((result) => {
			const job = nodeCron.schedule("*/30 * * * * *", () => {
				let title = result[position].Title
				let company = result[position].Company
				let location = result[position].Location
				let link = result[position].Link

				if(position > 50){
					return client.sendMessage(
						myGroup.id._serialized, `Hello, this is a scheduled message(position ${position})!`
					)
				}
				
				client.sendMessage(
					myGroup.id._serialized, ` 💡\`\`\`LINKEDIN JOB ALERTS\`\`\`💡
					\n *Title*: ${title}
					\n *Company*: ${company}
					\n *Location*: ${location}
					\n *Link*: ${link}
					`
				)
				position++
			});
		}).catch( err => {console.log(err)})

	})
});

client.on('message', message => {
	console.log(message.body);
});

function sendMessage(message){
	client.sendMessage(
		myGroup.id._serialized, ` 💡\`\`\`LINKEDIN JOB ALERTS\`\`\`💡
		\n *Title*: ${title}
		\n *Company*: ${company}
		\n *Location*: ${location}
		\n *Link*: ${link}
		`
	)
}

client.initialize();
