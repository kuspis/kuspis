import chalk from "chalk";

/**
 * Writes string to stdout
 * @param str string to write
 */
export function writeline(str: string) {
	process.stdout.write(`${str}\n`);
}

/**
 * Writes message as log
 * @param str message to write
 */
export function log(str: string) {
	writeline(chalk.greenBright(`[LOG] ${str}`));
}

/**
 * Writes message as error to stderr
 * @param str message to write
 */
export function error(str: string) {
	process.stderr.write(chalk.redBright(`[ERROR] ${str}\n`));
}

/**
 * Writes message as warning
 * @param str message to write
 */
export function warning(str: string) {
	writeline(chalk.yellowBright(`[WARNING] ${str}`));
}

/**
 * Writes message as info
 * @param str message to write
 */
export function info(str: string) {
	writeline(chalk.blueBright(`[INFO] ${str}`));
}