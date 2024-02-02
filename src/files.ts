import { promises as fs } from 'fs';
import path from 'path';
import Kuspis from './index.js';

export default class Files {
	private kuspis: Kuspis;

	public constructor(kuspis: Kuspis) {
		this.kuspis = kuspis;
	}

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

	public async loadConfig(filePath: string) {
		return await this.loadJSON(path.join('config', filePath))
	}
}