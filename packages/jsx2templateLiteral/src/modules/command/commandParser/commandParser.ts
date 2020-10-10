import { Command } from "commander";
import { Schema } from "./schema";

export const commandParser = (argv: string[]) => {
  const program = new Command();
  program.option("-t, --tsconfig").option("-e, --entry").option("-o, --output");

  program.parse(argv);

  return (program as any) as Schema;
};
