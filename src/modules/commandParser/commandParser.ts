import { Command } from "commander";
import { Schema } from "./schema";

export const commandParser = (argv: string[]) => {
  const program = new Command();
  program.option("-t, --tsconfig").option("-e, --entry").option("-d, --dist");

  const schema = (program.parse(argv) as any) as Schema;

  return schema;
};
