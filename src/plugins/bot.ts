import Kuspis from "../index.js";
import { IBotConfig } from "../interfaces/config.js";
import { Context, Middleware, Telegraf } from "telegraf";

export default class BotPlugin {
	private kuspis: Kuspis;
	public config: IBotConfig;
	private bot: Telegraf;

	public constructor(kuspis: Kuspis) {
		this.kuspis = kuspis;
	}
	
	public async preInit() {
		this.config = await this.kuspis.files.loadConfig('bot.json');
	}

	public async start() {
		this.bot = new Telegraf(this.config.token);
		this.kuspis.log('Starting Longpoll...');
		this.bot.launch();
		this.kuspis.log('The bot is up and running.');
	}
}