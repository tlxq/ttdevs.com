import { ITerminalCommand, CommandResult } from "../types";
import { FEATURED_PROJECTS } from "../../data/profiles";

export class ProjectsCommand implements ITerminalCommand {
  name = "projects";
  description = "Browse our featured projects";

  execute(): CommandResult {
    const lines: CommandResult["lines"] = [
      { text: "FEATURED PROJECTS", type: "output" },
      { text: "──────────────────────────────────────────────", type: "output" },
    ];

    Object.values(FEATURED_PROJECTS).forEach((project) => {
      lines.push({ text: `→ ${project.title.padEnd(20, " ")} ${project.desc}`, type: "output" });
      if (project.href) {
        lines.push({ text: `  ${project.href}`, type: "cyan" });
      }
    });

    lines.push({ text: "──────────────────────────────────────────────", type: "output" });
    lines.push({ text: 'Type "start" to see the visual portfolio.', type: "output" });
    lines.push({ text: "", type: "blank" });

    return { lines };
  }
}
