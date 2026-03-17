# How FuturePlix Code Runner Works 🚀

The **FuturePlix Code Runner** extension is designed to bridge the gap between writing code and seeing results instantly. Here is a breakdown of its internal mechanics:

## 1. Activation & Command Registration
When the extension starts, it registers a unique command: `futureplix-runner.run`. This command is the brain of the extension and is tied to:
- **Editor Title Bar**: A "Play" button (▶) visible whenever a compatible file is open.
- **Keyboard Shortcut**: `Ctrl + Alt + R`.
- **Command Palette**: Accessible via `FuturePlix: Run Code`.

## 2. Contextual Awareness (Language Detection)
When you trigger the command, the extension looks at the **Active Text Editor**. It uses the VS Code API (`editor.document.languageId`) to identify the programming language:
- **JavaScript**: identified as `javascript`.
- **Python**: identified as `python`.
- **C**: identified as `c`.

## 3. Intelligent Command Construction
Based on the detected language, the extension constructs a single terminal command using **Absolute Paths**:
- **JS**: `node "C:\path\to\file.js"`
- **Python**: `python "C:\path\to\file.py"`
- **C**: Compiles and runs in one go using absolute paths: `gcc "C:\path\to\file.c" -o "C:\path\to\file" && "C:\path\to\file"` (with `.exe` handling for Windows).

## 4. Integrated Terminal Execution
Instead of using popups or output channels, the extension interacts directly with the **Integrated Terminal**:
1. **Find or Create**: It looks for an existing terminal named "FuturePlix Output". If it doesn't exist, it creates one.
2. **One-Shot Execution**: It sends the full absolute command immediately to the terminal, allowing you to see output instantly without needing to manually `cd` into folders.

## 5. UI/UX Features
- **Focus**: The terminal is automatically shown and focused when code runs.
- **Identity**: Designed to feel like a core part of the **FuturePlix** developer ecosystem.

---
**Enjoy faster coding!** 🚀
