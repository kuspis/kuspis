export default interface ICommand {
	/**
	 * Name of the command.
	 */
	name: string;

	/**
	 * Description of the command.
	 * Will be printed in help menu.
	 */
	description?: string;

	/**
	 * Usage of the command.
	 * Will be printed in help menu.
	 */
	usage?: string;

	/**
	 * Handler of the command. Will be called when the command is used.
	 */
	handler: any;
}