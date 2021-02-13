// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import deleteNamespace from './namespaces/deleteNamespace';
import createNewPaste from './elements/createNewPaste';
import resetToken from './namespaces/resetToken';
import submitNew from './namespaces/submitNew';
import register from './namespaces/register';
import modify from './namespaces/modify';
import * as vscode from 'vscode';
import msg from './util/msg';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vsx0" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const paste_disposable = vscode.commands.registerCommand(
    'vsx0.paste',
    async () => {
      // The code you place here will be executed every time your command is executed

      // console.log(vscode.env.clipboard)
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        msg.error('No Editor open at the moment as it seems');
        return;
      }
      const text = editor.document.getText(editor.selection);
      if (!text) return msg.warn('No text selected');

      const tokens = await context.secrets.get('x0_tokens');
      if (!tokens) {
        msg.warn('I was unable to find any saved namespaces.');
        const registerOrSubmitExisting = await vscode.window.showQuickPick([
          'Register new namespace',
          'Submit already existing namespace and token'
        ]);
        if (registerOrSubmitExisting) {
          if (registerOrSubmitExisting.startsWith('Submit')) {
            await submitNew(context);
          } else if (registerOrSubmitExisting.startsWith('Register')) {
            await register(context);
          }
        }
      } else {
        // get token(s)(if theres more than one show user select input) and send request to x0 api
        const parsedTokens = JSON.parse(tokens);
        const quickPickOptionsToShow = [];
        Object.keys(parsedTokens).forEach((namespace) =>
          quickPickOptionsToShow.push(namespace)
        );
        quickPickOptionsToShow.push(
          '> Register a new namespace (Requires invite)',
          '> Submit a new namespace and save it in memory.',
          '> Modify an existing namespace (eg. when your token has changed)',
          '> Reset token for existing namespace (if your token ever gets compromised)',
          // Note: show user the token when deleting namespace, also show message if
          // ns should also be deleted on server
          '> Delete an existing namespace (Does not delete the namespace from the server!)'
        );
        const selectNameSpace = await vscode.window.showQuickPick(
          quickPickOptionsToShow,
          {
            placeHolder: 'Pick which namespace you want to use'
          }
        );
        if (!selectNameSpace) return;

        if (selectNameSpace.includes('> Delete an existing namespace')) {
          return await deleteNamespace(context);
        } else if (selectNameSpace.includes('> Reset token')) {
          return await resetToken(context);
        } else if (selectNameSpace.includes('> Modify an')) {
          return await modify(context);
        } else if (selectNameSpace.includes('> Register')) {
          return await register(context);
        } else if (selectNameSpace.startsWith('> Submit a')) {
          return await submitNew(context);
        }

        const customKey = await vscode.window.showInputBox({
          prompt:
            'Do you want to use a custom key for this paste? If so enter it now. If not just cancel this input',
          placeHolder: '"github" or "readme"for example.'
        });

        await createNewPaste(
          selectNameSpace,
          parsedTokens[selectNameSpace],
          text,
          customKey
        );
      }
    }
  );

  context.subscriptions.push(paste_disposable);
}

// this method is called when your extension is deactivated
// eslint-disable-next-line
export function deactivate() {}
