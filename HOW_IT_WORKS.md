# How FuturePlix Code Runner Works 🚀

The **FuturePlix Code Runner** extension is designed to bridge the gap between writing code and seeing results instantly. Here is a breakdown of its internal mechanics:

## 1. Activation & Command Registration
When the extension starts, it registers a unique command: `futureplix-runner.run`. This command is the brain of the extension and is tied to:
- **Editor Title Bar**: A "Play" button (▶) visible whenever a compatible file is open.
- **Status Bar**: A "Run Code" button on the bottom right.
- **Keyboard Shortcut**: `Ctrl + Alt + R`.
- **Command Palette**: Accessible via `FuturePlix: Run Code` and `FuturePlix: Clear Terminal`.

## 2. Contextual Awareness (Language Detection)
When you trigger the command, the extension looks at the **Active Text Editor**. It uses the VS Code API (`editor.document.languageId`) to identify the programming language:
- **JavaScript**: identified as `javascript`.
- **Python**: identified as `python`.
- **C/C++**: identified as `c` or `cpp`.
- **Java**: identified as `java`.
- **PHP**: identified as `php`.
- **Go**: identified as `go`.

## 3. Intelligent Command Construction
Based on the detected language, the extension constructs a single terminal command using **Absolute Paths**:
- **JS**: `node "C:\path\to\file.js"`
- **Python**: `python "C:\path\to\file.py"`
- **C/C++**: Compiles and runs in one go: `gcc/g++ "C:\path\to\file.c" -o "C:\path\to\file" && "C:\path\to\file"`
- **Java**: `javac "file.java" && java -cp "dir" "FileName"`
- **PHP**: `php "file.php"`
- **Go**: `go run "file.go"`

## 4. Integrated Terminal Execution
Instead of using popups or output channels, the extension interacts directly with the **Integrated Terminal**:
1. **Find or Create**: It looks for an existing terminal named "FuturePlix Output". If it doesn't exist, it creates one.
2. **Auto-Save**: The extension automatically saves the current file before execution to ensure the latest changes are reflected.
3. **Auto-Clear**: It sends a `cls` or `clear` command to the terminal before running the code to keep your workspace tidy.
4. **One-Shot Execution**: It sends the full absolute command immediately to the terminal.

## 5. UI/UX Features
- **Focus**: The terminal is automatically shown and focused when code runs.
- **Identity**: Designed to feel like a core part of the **FuturePlix** developer ecosystem.

---
**Enjoy faster coding!** 🚀
