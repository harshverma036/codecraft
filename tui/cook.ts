import figlet from "figlet";
import chalk from "chalk";
import { select, isCancel } from "@clack/prompts";
import { runAgentMode } from "../carft-modes/agent/agent";
import { cliMode } from "../carft-modes/cli";

const BANNER_FONT = "ANSI Shadow";
const SHADOW = chalk.hex("#5b4d9e");
const FACE = chalk.hex("#e8dcf8").bold;

function printBannerWithShadow(ascii: string) {
  const bannerLines = ascii.replace(/\s+$/, "").split("\n");
  const maxLen = Math.max(...bannerLines.map((l) => l.length), 0);
  const rowWidth = maxLen + 2;

  for (const line of bannerLines) {
    console.log(SHADOW(("  " + line).padEnd(rowWidth)));
  }
  process.stdout.write(`\x1b[${bannerLines.length}A`);
  for (const line of bannerLines) {
    console.log(FACE(line.padEnd(rowWidth)));
  }
  console.log();
}

export async function runCook() {
  let ascii: string;
  try {
    ascii = figlet.textSync("codecraft", {
      font: BANNER_FONT,
    });
  } catch (error) {
    ascii = figlet.textSync("codecraft", {
      font: "Standard",
    });
  }

  printBannerWithShadow(ascii);

  const mode = await select({
    message: "Pick a mode to get started:",
    options: [
      {
        label: "Cli",
        value: "cli",
      },
      {
        label: "Telegram",
        value: "telegram",
      },
      {
        label: "Exit",
        value: "exit",
      },
    ],
  });

  //   if closed or terminated
  if (isCancel(mode) || mode === "exit") {
    console.log(chalk.yellow("\n See you soon bitch! \n"));
    return;
  }

  // case based mode execution for agent and plan.
  if (mode === "cli") {
    await cliMode();
  } else if (mode === "telegram") {
    await runAgentMode();
  }
}
