// src/index.ts
import { program } from "commander";
import qrcode from "qrcode";
import chalk from "chalk";

/**
 * Renders a QR code in the terminal with customizable options
 */
export async function renderQRCodeInTerminal(
  text: string,
  options: {
    dark?: string;
    light?: string;
    margin?: number;
    small?: boolean;
    color?:
      | "blue"
      | "green"
      | "red"
      | "yellow"
      | "cyan"
      | "magenta"
      | "white"
      | "gray"
      | "black";
  } = {}
): Promise<void> {
  const { dark = "█", light = " ", margin = 1, small = false, color } = options;

  try {
    // Generate QR code as a string
    const qrString = await qrcode.toString(text, {
      type: "terminal",
      errorCorrectionLevel: "M",
      margin: margin,
      small: small,
    });

    // Apply color if specified
    if (color && chalk[color]) {
      console.log(chalk[color](qrString));
    } else if (color) {
      // Try to use hex color if it's not a named color
      try {
        console.log(chalk.hex(color)(qrString));
      } catch (error) {
        // Fallback to original if hex color is invalid
        console.log(qrString);
      }
    } else {
      console.log(qrString);
    }

    return;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
}

/**
 * Save QR code to a file
 */
export async function saveQRCodeToFile(
  text: string,
  filePath: string,
  options: qrcode.QRCodeToFileOptions = {}
): Promise<void> {
  try {
    await qrcode.toFile(filePath, text, {
      errorCorrectionLevel: "M",
      margin: 4,
      scale: 4,
      ...options,
    });
    console.log(chalk.green(`QR code saved to ${filePath}`));
  } catch (error) {
    console.error(chalk.red(`Error saving QR code to file: ${error}`));
    throw error;
  }
}

// CLI logic
if (require.main === module) {
  program
    .name("qr-cliinal")
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
}
