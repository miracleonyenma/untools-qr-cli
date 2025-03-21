#!/usr/bin/env node
import { program } from "commander";
import { renderQRCodeInTerminal, saveQRCodeToFile } from "./index";
import chalk from "chalk";

program
  .name("qr-cli")
  .description("Generate QR codes in the terminal")
  .version("1.0.0");

program
  .command("generate")
  .description("Generate a QR code in the terminal")
  .argument("<text>", "text or URL to encode")
  .option("-d, --dark <char>", "character for dark modules", "█")
  .option("-l, --light <char>", "character for light modules", " ")
  .option("-m, --margin <number>", "margin size", "1")
  .option("-s, --small", "use compact mode without spaces", false)
  .option("-c, --color <color>", "color for QR code (name or hex)", "")
  .option("-o, --output <file>", "save QR code to a file")
  .action(async (text, options) => {
    try {
      if (options.output) {
        await saveQRCodeToFile(text, options.output);
      } else {
        await renderQRCodeInTerminal(text, {
          dark: options.dark,
          light: options.light,
          margin: parseInt(options.margin),
          small: options.small,
          color: options.color,
        });
      }
    } catch (error) {
      console.error(chalk.red("Failed to generate QR code"));
      process.exit(1);
    }
  });

program.parse();
