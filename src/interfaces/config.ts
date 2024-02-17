export interface IBotConfig {
	/**
	 * Your telegram bot token.
	 */
	token: string;
}

export interface IDbConfig {
	/**
	 * Your database URI to connect.
	 * 
	 * Examples:
	 * 
	 * *sqlite::memory:*
	 * 
	 * *postgres://user:pass@example.com:5432/dbname*
	 * 
	 * *sqlite:bot.db*
	 */
	database: string;
}