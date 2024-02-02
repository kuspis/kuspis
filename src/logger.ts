import chalk from "chalk";

export function writeline(str: string) {
	process.stdout.write(`${str}\n`);
}

export function log(str: string) {
	writeline(chalk.greenBright(`[LOG] ${str}`));
}

export function error(str: string) {
	process.stderr.write(chalk.redBright(`[ERROR] ${str}\n`));
}

export function warning(str: string) {
	writeline(chalk.yellowBright(`[WARNING] ${str}`));
}

export function info(str: string) {
	writeline(chalk.blueBright(`[INFO] ${str}`));
}