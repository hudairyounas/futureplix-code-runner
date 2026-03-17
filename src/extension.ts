import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('futureplix-runner.run', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No active editor found.');
            return;
        }

        const document = editor.document;
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
            case 'c':
                const isWindows = process.platform === 'win32';
                const outputName = isWindows ? `"${filePathNoExt}.exe"` : `"${filePathNoExt}"`;
                const runCmd = isWindows ? `"${filePathNoExt}.exe"` : `"${filePathNoExt}"`;
                command = `gcc "${filePath}" -o ${outputName} && ${runCmd}`;
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
        // Run the command with absolute path
        terminal.sendText(command);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
