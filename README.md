# QR Code Terminal Generator

Generate QR codes directly in your terminal or save them to files using this TypeScript CLI tool.

## Installation

```bash
# Install globally
npm install -g qrcode-terminal-ts

# Or use with npx
npx qrcode-terminal-ts generate "https://example.com"
```

## CLI Usage

```bash
# Basic usage
qrcode-term generate "https://example.com"

# With custom styling
qrcode-term generate "https://example.com" --dark "##" --light ".." --margin 2

# With colors
qrcode-term generate "https://example.com" --color "blue"
qrcode-term generate "https://example.com" --color "#ff0000"

# Compact mode
qrcode-term generate "https://example.com" --small

# Save to file
qrcode-term generate "https://example.com" --output qrcode.png
```

## API Usage

You can also use this package programmatically:

```typescript
import { renderQRCodeInTerminal, saveQRCodeToFile } from 'qrcode-terminal-ts';

// Display QR code in terminal
await renderQRCodeInTerminal('https://example.com', {
  dark: '██',
  light: '  ',
  margin: 2,
  small: false,
  color: 'blue' // or '#ff0000' for hex color
});

// Save QR code to file
await saveQRCodeToFile('https://example.com', 'qrcode.png');
```

## Options

| Option | Description | Default |
|--------|-------------|---------|
| `dark` | Character used for dark modules | █ |
| `light` | Character used for light modules | space |
| `margin` | Margin size around QR code | 1 |
| `small` | Compact mode without spaces between modules | false |
| `color` | Color for the QR code (named color or hex) | - |
| `output` | File path to save the QR code (PNG format) | - |

## Available Colors

You can use any of these color names with the `--color` option:

- black, red, green, yellow, blue, magenta, cyan, white
- gray, grey, blackBright, redBright, greenBright, yellowBright, blueBright, magentaBright, cyanBright, whiteBright

Or you can specify a hex color like `#ff0000` for red.

## License

MIT
