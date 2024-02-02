import { promises as fs } from 'fs';
import path from 'path';
import Kuspis from './index.js';

export default class Files {
	private kuspis: Kuspis;

	public constructor(kuspis: Kuspis) {
		this.kuspis = kuspis;
	}

	/**
	 * Read the file and parse json from it
	 * @param rawPath path to json file
	 * @returns JSON object from the file
	 */
	public async loadJSON(rawPath: string) {
		const filePath = path.isAbsolute(rawPath)
			? rawPath
			: path.join(this.kuspis.botdir, rawPath);

		try {
			const data = await fs.readFile(filePath);
			const result = JSON.parse(data.toString());
			return result;
		} catch (error) {
			throw Error(`Can't read json from ${filePath}!`);
		}
	}

	/**
	 * Read the config file and return as a JSON object
	 * @param filePath path to config file
	 * @returns JSON object from the file
	 */
	public async loadConfig(filePath: string) {
		return await this.loadJSON(path.join('config', filePath))
	}
}