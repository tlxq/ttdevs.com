import { ITerminalCommand, CommandResult } from "./types";
import { HelpCommand } from "./commands/HelpCommand";
import { AboutCommand } from "./commands/AboutCommand";
import { SkillsCommand } from "./commands/SkillsCommand";
import { ProjectsCommand } from "./commands/ProjectsCommand";
import { StartCommand } from "./commands/StartCommand";
import { ClearCommand } from "./commands/ClearCommand";
import { CatCommand } from "./commands/CatCommand";
import { PetCommand } from "./commands/PetCommand";
import { CatFactCommand } from "./commands/CatFactCommand";
import { CoffeeCommand } from "./commands/CoffeeCommand";
import { SudoCommand } from "./commands/SudoCommand";
import { StackCommand } from "./commands/StackCommand";
import { HireCommand } from "./commands/HireCommand";
import { ContactCommand } from "./commands/ContactCommand";
import { MatrixCommand } from "./commands/MatrixCommand";
import { ShortcutsCommand } from "./commands/ShortcutsCommand";

export class TerminalEngine {
  private commands = new Map<string, ITerminalCommand>();

  constructor() {
    this.registerCommand(new AboutCommand());
    this.registerCommand(new SkillsCommand());
    this.registerCommand(new ProjectsCommand());
    this.registerCommand(new StartCommand());
    this.registerCommand(new ClearCommand());
    this.registerCommand(new CatCommand());
    this.registerCommand(new PetCommand());
    this.registerCommand(new CatFactCommand());
    this.registerCommand(new CoffeeCommand());
    this.registerCommand(new SudoCommand());
    this.registerCommand(new StackCommand());
    this.registerCommand(new HireCommand());
    this.registerCommand(new ContactCommand());
    this.registerCommand(new MatrixCommand());
    this.registerCommand(new ShortcutsCommand());
    this.registerCommand(new HelpCommand(this.commands));
  }

  registerCommand(cmd: ITerminalCommand) {
    this.commands.set(cmd.name.toLowerCase(), cmd);
  }

  getCommandNames(): string[] {
    return Array.from(this.commands.keys());
  }

  process(input: string): CommandResult {
    const [cmdName, ...args] = input.trim().split(/\s+/);
    if (!cmdName) return { lines: [] };

    const command = this.commands.get(cmdName.toLowerCase());
    if (command) {
      return command.execute(args);
    }

    return {
      lines: [
        { text: `Command not found: "${cmdName}". Type "help" for available commands.`, type: "error" },
        { text: "", type: "blank" }
      ]
    };
  }
}
