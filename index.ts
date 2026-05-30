#!/usr/bin/env bun

import { Command } from "commander";
import { runCook } from "./tui/cook";

const program = new Command();

/* for main command */
program
  .name("codecraft-build")
  .description("Codecraft coding agent (Claude code clone)")
  .version("0.0.1");

/*  */
program
  .command("cook")
  .description("Codecraft start cooking...")
  .action(async () => {
    await runCook()
  });

await program.parseAsync(process.argv);
