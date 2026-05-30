import { isCancel, select } from "@clack/prompts";
import chalk from "chalk";
import { runAgentMode } from "./agent/agent";
import { runAskMode } from "./ask/ask";
import { runPlanMode } from "./plan/plan";

export const cliMode = async () => {
  while (true) {
    const mode = await select({
      message: "Choose CLI > mode",
      options: [
        {
          label: "Agent",
          value: "agent",
        },
        {
          label: "Plan",
          value: "plan",
        },
        {
          label: "Ask",
          value: "ask",
        },
        {
          label: "Exit",
          value: "exit",
        },
      ],
    });

    if (isCancel(mode) || mode === "exit") {
      console.log(chalk.yellow("\n Fuck you! bye.. \n"));
      return;
    }

    if (mode === "agent") {
      await runAgentMode();
    }

    if (mode === "ask") {
      await runAskMode();
    }

    if (mode === "plan") {
      await runPlanMode();
    }
  }
};
