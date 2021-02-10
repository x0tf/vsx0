// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "x0" is now active!',
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    'x0.paste',
    async () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      //vscode.window.showInformationMessage(
      //  'Hello World from x0!',
      //);
      //vscode.window.showErrorMessage('This a error msg');
      //vscode.window.showWarningMessage('This a warning');

      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        vscode.window.showErrorMessage(
          'No Editor open at the moment as it seems',
        );
        return;
      }
      const text = editor.document.getText(
        editor.selection,
      );
      vscode.window.showInformationMessage(
        `selected text: ${text}`,
      );

      const tokensInStorage = await context.globalState.get(
        'x0_tokens',
      );
      if (!tokensInStorage) {
        vscode.window.showErrorMessage(
          'You are not registered as it seems.',
        );
        // context.globalState.setKeysForSync()
        return;
      }
    },
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
// eslint-disable-next-line
export function deactivate() {}
