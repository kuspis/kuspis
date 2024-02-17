import Kuspis from "../index.js";
import { Model, ModelAttributes, ModelOptions, Sequelize } from "sequelize";
import { IDbConfig } from "../interfaces/config.js";

export default class DatabasePlugin {
	private kuspis: Kuspis;
	public sequelize: Sequelize;

	public constructor(kuspis: Kuspis) {
		this.kuspis = kuspis;
	}
	
	public async preInit() {
		const config: IDbConfig = await this.kuspis.files.loadConfig('database.json');
		this.sequelize = new Sequelize(config.database, {
			logging: false,
			pool: {
				idle: 30000,
			},
		});

		try {
			await this.sequelize.authenticate();
			this.kuspis.log('Database connected.');
		} catch (error) {
			throw Error(`Error connecting to database: ${error.message}`);
		}
	}


}