import * as Logger from './logger.js';
import Files from './files.js';
import path from 'path';
import { PluginManager } from './plugins.js';
import { fileURLToPath } from 'url';

export default class Kuspis {
	public files = new Files(this);

	public log = Logger.log;
	public error = Logger.error;
	public warning = Logger.warning;
	public info = Logger.info;
	
	public botdir = path.resolve('.');
	public dir = path.join(path.dirname(fileURLToPath(import.meta.url)));
	public version!: number;
	public pluginManager = new PluginManager(this);

	private shutdownCallbacks: Array<() => void> = [];

	/**
	 * Initializes your bot, loads all configs and plugins and starts Telegraf.
	 */
	public async start() {
		process.on('SIGINT', () => this.shutdown());
		process.on('SIGTERM', () => this.shutdown());

		process.on('warning', warning => {
			this.warning(warning.message);
		});

		try {
			const packageInfo = await this.files.loadJSON(`${this.dir}/../package.json`);
			this.version = packageInfo.version;
			this.info(`Kuspis v${this.version}`);

			await this.pluginManager.loadPlugins();
		} catch (error) {
			this.error(`Bot start: ${error.message}`);
      		this.shutdown(1);
		}

		process.on('uncaughtException', error => {
			this.error(`Runtime error: ${error.stack}`);
		});
	}

	/**
	 * Triggers all callbacks and exits.
	 * @param code code to exit with
	 */
	public async shutdown(code = 0) {
		this.log('Shutting down Kuspis...');
		await Promise.all(this.shutdownCallbacks.map((v => v())));
		this.log('Exit.');
		process.exit(code);
	}

	/**
	 * Adds shutdown callback.
	 * 
	 * It will trigger when your bot is about to shutdown.
	 * @param callback callback to add
	 */
	public onShutdown(callback: () => void) {
		this.shutdownCallbacks.push(callback);
	}
}