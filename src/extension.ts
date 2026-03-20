import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    // Create Status Bar Item
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'futureplix-runner.run';
    statusBarItem.text = '$(play) Run Code';
    statusBarItem.tooltip = 'FuturePlix: Run Code';
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // Register Run Command
    let runDisposable = vscode.commands.registerCommand('futureplix-runner.run', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No active editor found.');
            return;
        }

        const document = editor.document;
        
        // Auto-save before run
        await document.save();

        const filePath = document.fileName;
        const languageId = document.languageId;
        const dir = path.dirname(filePath);
        const fileName = path.basename(filePath);
        const fileNameWithoutExt = path.parse(fileName).name;

        let command = '';
        const filePathNoExt = path.join(dir, fileNameWithoutExt);

        switch (languageId) {
            case 'javascript':
                command = `node "${filePath}"`;
                break;
            case 'python':
                command = `python "${filePath}"`;
                break;
            case 'php':
                command = `php "${filePath}"`;
                break;
            case 'go':
                command = `go run "${filePath}"`;
                break;
            case 'c':
                const isWindows = process.platform === 'win32';
                const outputName = isWindows ? `"${filePathNoExt}.exe"` : `"${filePathNoExt}"`;
                const runCmd = isWindows ? `"${filePathNoExt}.exe"` : `"${filePathNoExt}"`;
                command = `gcc "${filePath}" -o ${outputName} && ${runCmd}`;
                break;
            case 'cpp':
                const isWindowsCpp = process.platform === 'win32';
                const outputNameCpp = isWindowsCpp ? `"${filePathNoExt}.exe"` : `"${filePathNoExt}"`;
                const runCmdCpp = isWindowsCpp ? `"${filePathNoExt}.exe"` : `"${filePathNoExt}"`;
                command = `g++ "${filePath}" -o ${outputNameCpp} && ${runCmdCpp}`;
                break;
            case 'java':
                command = `javac "${filePath}" && java -cp "${dir}" "${fileNameWithoutExt}"`;
                break;
            default:
                vscode.window.showErrorMessage(`Language ${languageId} is not supported by FuturePlix Runner yet.`);
                return;
        }

        // Create or get the terminal
        let terminal = vscode.window.terminals.find(t => t.name === 'FuturePlix Output');
        if (!terminal) {
            terminal = vscode.window.createTerminal('FuturePlix Output');
        }

        terminal.show();
        
        // Clear terminal before running
        terminal.sendText(process.platform === 'win32' ? 'cls' : 'clear');
        
        // Run the command
        terminal.sendText(command);
    });

    // Register Clear Command
    let clearDisposable = vscode.commands.registerCommand('futureplix-runner.clear', () => {
        const terminal = vscode.window.terminals.find(t => t.name === 'FuturePlix Output');
        if (terminal) {
            terminal.sendText(process.platform === 'win32' ? 'cls' : 'clear');
        }
    });

    context.subscriptions.push(runDisposable, clearDisposable);
}

export function deactivate() {}
