import qrcode from 'qrcode-terminal'
import wweb from 'whatsapp-web.js';
const { Client, LocalAuth } = wweb
import schedule from 'node-schedule';
import nodeCron from 'node-cron';
// import scraper from './tools/scraper.js';
import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import cors from 'cors'
const app = express();
import bodyParser from 'body-parser'
// const index = require("../index")
let myGroup = {}
let isReady = false;


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
		// console.log(chats)
		myGroup = chats.find((chat) => chat.name === testGroupName);
		client.sendMessage(
			myGroup.id._serialized, 'Hello from the other side!'
		)

		let position = 0
	})
});

client.on('message', message => {
	console.log(message.body);
});

client.initialize()



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/simplesend', (req, res, next) => {
	const message = req.body
	const date = new Date

	function sendMessage(){
		client.sendMessage(
			myGroup.id._serialized, message.content
		).then(() => {
			console.log('Message sent!', 'Is instant?', message.isInstant)
			res.status(200).json({
				message: 'Sent!',
			})
		}).catch(err => {
			console.log('Message not sent!',err)					
			res.status(400).json({
				message: 'Something went wrong...',
			})
		})
	}

	if(!message.isInstant){
		const job = schedule.scheduleJob(message.date, function(){
			client.sendMessage(
				myGroup.id._serialized, message.content
			)
		})
		console.log('Scheduled message')
		res.status(200).json({
			message: 'Message Scheduled!',
		})
		return;
	}

	sendMessage()

})

function getState(){
	// console.log(isReady)
	return isReady
}

export default {getState, app};