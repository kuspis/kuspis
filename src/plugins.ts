import Kuspis from "./index.js";
import path from "path";

export class PluginManager {
	private kuspis: Kuspis;
	public pluginsList: string[];
	public plugins = {};

	public constructor(kuspis: Kuspis) {
		this.kuspis = kuspis;
	}

	/**
	 * Loads plugins listed in config/plugins.json.
	 */
	public async loadPlugins() {
		const startAt = Date.now();

		try {
			this.pluginsList = await this.kuspis.files.loadConfig('plugins.json');
		} catch {
			this.kuspis.warning('No plugins.json is found, no plugins will be loaded.');
			this.pluginsList = [];
		}

		for (let plugin of this.pluginsList) {
			try {
				await this.loadPlugin(plugin);
			} catch {
				this.kuspis.warning(`Can't find plugin "${plugin}"!`);
				continue;
			}
		}

		const loadedAmount = Object.keys(this.plugins).length;
		this.kuspis.log(`Plugins loaded successfully (${loadedAmount} pcs. / ${Date.now() - startAt} ms).`);

		for (let plugin of Object.values(this.plugins)) {
			if (plugin['preInit']) await plugin['preInit'](this.kuspis);
		}
		
		for (let plugin of Object.values(this.plugins)) {
			if (plugin['init']) await plugin['init'](this.kuspis);
		}

		this.kuspis.log(`Plugins were initialized.`);
	}

	/**
	 * Loads plugin with specified name.
	 * @param plugin plugin name
	 */
	private async loadPlugin(plugin: string) {
		const startedAt = Date.now();

		const pluginPath = path.join(this.kuspis.dir, 'plugins', plugin + '.js');
		const { default: pluginClass } = await import('file:///' + pluginPath);
		this.plugins[plugin] = new pluginClass(this.kuspis);

		this.kuspis.log(`Loaded plugin ${plugin} (${Date.now() - startedAt} ms).`);
	}

	/**
	 * Returns instance of plugin with specified name.
	 * @param plugin plugin name
	 * @returns plugin instance
	 */
	public getPlugin(plugin: string) {
		try {
			return this.plugins[plugin];
		} catch {
			throw Error(`Can't get plugin "{plugin}"!`);
		}
	}
}