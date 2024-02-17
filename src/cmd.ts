import Kuspis from "./index.js";
import { ReadLine, createInterface } from "readline";
import ICommand from "./interfaces/commands.js";

export default class Cmd {
	private kuspis: Kuspis;
	private rl: ReadLine;
	private commands: Record<string, ICommand> = {};

	constructor(kuspis: Kuspis) {
		this.kuspis = kuspis;
		const { stdin: input, stdout: output } = process;
		this.rl = createInterface({ input, output, prompt: '> ' });
		this.rl.on('line', (input) => this.handler(input));
		this.rl.on('close', () => {
			process.stdout.write('\n');
			process.kill(process.pid, 'SIGINT');
		});

		this.command({
			name: 'help',
			description: 'print this message',
			handler: () => {
				this.kuspis.log('List of available commands:');
				for (const { name, description, usage } of Object.values(this.commands)) {
					this.kuspis.log(
						`● ${name}${usage? ` ${usage}` : ''}: ${description}`
					);
				}
			}
		});

		this.command({
			name: 'exit',
			description: 'shutdown the bot',
			handler: (async () => await this.kuspis.shutdown())
		});
	}

	public command(command: any) {
		this.commands[command.name] = command;
	}

	private async handler(input: string) {
		const args = input.trim().split(' ');
		if (!args[0]) {
			return;
		}

		const command = this.commands[args[0]];
		if (!command) {
			this.kuspis.log(`Command ${args[0]} not found.`);
			this.kuspis.log(`Use 'help' to get list of available commands.`);
			this.prompt();
			return;
		}

		await command.handler(args);

		this.prompt();
	}

	public prompt() {
		this.rl.prompt();
	}

	public question(str: string) {
		return new Promise(resolve => this.rl.question(str, resolve));
	}

	public async questionYN(str: string) {
		const response = await this.question(`${str}? [y/n] `);
    	return response === 'y';
	}
}