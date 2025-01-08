// t.me/alexei_s_bot
const config = require("./config");
let localConfig = {};
try {
	localConfig = require("./local-config");
} catch (error) {/**/}
const _ = require("lodash");
const cfg = _.merge(config, localConfig);
const mongoose = require('mongoose');
const Messages = require('./models/Messages');
const MONGO_URI = `mongodb://${cfg.mongodb.host}:${cfg.mongodb.port}/personal_bot_service`;
mongoose.connect(MONGO_URI, {})
	.then(() => console.log('Подключение к MongoDB успешно'))
	.catch(err => console.error('Ошибка подключения к MongoDB:', err));

const TelegramBot = require('node-telegram-bot-api');
const token = cfg.apiKey;
const bot = new TelegramBot(token, { polling:true });
bot.onText(/\/start/, msg => {
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, 'Привет! Я бот Алексея! Я служу только для обратной связи.');
});
bot.on('message', async msg => {
	console.log("Входящее сообщение:", msg);
	const chatId = msg.chat.id;
	if (msg.text !== '/start') {
		if (chatId == cfg.adminChatId) {
			const count = await Messages.countDocuments();
			bot.sendMessage(chatId, `Привет, Босс!. На данный момент в БД ${count} сообщений.`);
		} else {
			bot.sendMessage(chatId, "Хорошо, я передам данное сообщение Алексею, он ответит как можно быстрее.");
			bot.sendMessage(cfg.adminChatId, `Новое сообщение от пользователя ${msg.from.first_name} ${msg.from.last_name} (@${msg.from.username}): "${msg.text}"`);
		}
	}
	const newMessage = new Messages(msg);
	await newMessage.save();
});
