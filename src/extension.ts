// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const msg = {
  info: (msg: string) => vscode.window.showInformationMessage(msg),
  warn: (msg: string) => vscode.window.showWarningMessage(msg),
  error: (msg: string) => vscode.window.showErrorMessage(msg),
  success: (msg: string) => vscode.window.showInformationMessage('✅' + msg)
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "x0" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const paste_disposable = vscode.commands.registerCommand(
    'x0.paste',
    async () => {
      // The code you place here will be executed every time your command is executed

      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        msg.error('No Editor open at the moment as it seems');
        return;
      }
      const text = editor.document.getText(editor.selection);
      if (!text) return msg.warn('No text selected');
      msg.info(`selected text: ${text}`);

      const tokens = await context.secrets.get('x0_tokens');
      if (!tokens) {
        msg.error('Something went wrong');
        const registerOrSubmitExisting = await vscode.window.showQuickPick([
          'Register new namespace',
          'Submit already existing namespace and token'
        ]);
        console.log(registerOrSubmitExisting);
        if (registerOrSubmitExisting) {
          if (registerOrSubmitExisting.startsWith('Submit')) {
            console.log('time to submit a new token');
            const nameSpace = await vscode.window.showInputBox({
              prompt: 'Enter your already existing namespace',
              placeHolder: 'example'
            });
            if (nameSpace) {
              const userToken = await vscode.window.showInputBox({
                prompt:
                  'Enter the token now, it will look something like this: ',
                placeHolder: 'fbaelzugfjwnwara7z4hg89guab4-afrg7euj4e.awf7gzb'
              });
              if (userToken) {
                try {
                  const tokenObject = {};
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  tokenObject[nameSpace] = userToken;
                  context.secrets.store(
                    'x0_tokens',
                    JSON.stringify(tokenObject)
                  );
                  msg.success(`Saved the namespace ${nameSpace}!`);
                } catch (e) {
                  msg.error(
                    'Something went wrong while trying to save your namespace, please try again.'
                  );
                }
              }
            }
          } else if (registerOrSubmitExisting.startsWith('Register')) {
            console.log('register time');
            const invite = await vscode.window.showInputBox({
              prompt:
                'Enter your invite. This is required to register a namespace.'
            });
            if (!invite) return;
            console.log(
              'insert register function here (export to different file'
            );
          }
        }
      } else {
        // get token(s)(if theres more than one show user select input) and send request to x0 api
        console.log('tokens');

        const parsedTokens = JSON.parse(tokens);
        const quickPickOptionsToShow: string[] = [];
        Object.keys(parsedTokens).forEach((namespace) =>
          quickPickOptionsToShow.push(namespace)
        );
        quickPickOptionsToShow.push('Register new namespace');
        const selectNameSpace = await vscode.window.showQuickPick(
          quickPickOptionsToShow,
          {
            placeHolder: 'Pick which namespace you want to use'
          }
        );
        console.log(selectNameSpace);
      }
    }
  );

  context.subscriptions.push(paste_disposable);
}

// this method is called when your extension is deactivated
// eslint-disable-next-line
export function deactivate() {}
