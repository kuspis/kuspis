import chalk from "chalk";

export default class Logger {
	public writeline(str: string) {
		process.stdout.write(`${str}\n`);
	}

	public log(str: string) {
		this.writeline(chalk.greenBright(`[LOG] ${str}`));
	}

	public error(str: string) {
		process.stderr.write(chalk.redBright(`[ERROR] ${str}\n`));
	}

	public warning(str: string) {
		this.writeline(chalk.yellowBright(`[WARNING] ${str}`));
	}

	public info(str: string) {
		this.writeline(chalk.blueBright(`[INFO] ${str}`));
	}
}