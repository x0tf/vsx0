// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import http from './util/http';

const msg = {
  info: (msg: string) => vscode.window.showInformationMessage(msg),
  warn: (msg: string) => vscode.window.showWarningMessage(msg),
  error: (msg: string) => vscode.window.showErrorMessage(msg),
  success: (msg: string) => vscode.window.showInformationMessage('✅ ' + msg)
};

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

      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        msg.error('No Editor open at the moment as it seems');
        return;
      }
      const text = editor.document.getText(editor.selection);
      if (!text) return msg.warn('No text selected');

      const tokens = await context.secrets.get('x0_tokens');
      if (!tokens) {
        msg.error('I was unable to find any saved namespaces and tokens.');
        const registerOrSubmitExisting = await vscode.window.showQuickPick([
          'Register new namespace',
          'Submit already existing namespace and token'
        ]);
        if (registerOrSubmitExisting) {
          if (registerOrSubmitExisting.startsWith('Submit')) {
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
            const requestedNamespace = await vscode.window.showInputBox({
              prompt: 'Enter your desired name for the namespace now',
              placeHolder: '"vsx0"for example'
            });
            if (!requestedNamespace)
              return msg.info('Register process cancelled.');
            const invite = await vscode.window.showInputBox({
              prompt:
                'Enter your invite. This is required to register a namespace.'
            });
            if (!invite) return msg.info('Register process cancelled.');
            const res = await http.register(requestedNamespace, invite);
            const apiResponse = await JSON.parse(res.data.body.toString());
            if (apiResponse.messages) {
              msg.error(
                `The following error occured: ${apiResponse.messages[0]}`
              );
              return;
            }
            console.log(res);
            console.log(res.data.body.toString());
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
          '> Modify an existing namespace (eg. when your token has changed)',
          '> Reset token for existing namespace (if your token ever gets compromised)',
          // Note: show user the token when deleting namespace, also show message if
          // ns should also be deleted on server
          '> Delete an existing namespace (Be Careful!)'
        );
        const selectNameSpace = await vscode.window.showQuickPick(
          quickPickOptionsToShow,
          {
            placeHolder: 'Pick which namespace you want to use'
          }
        );
        if (!selectNameSpace) return;

        if (selectNameSpace.includes('> Delete an existing namespace')) {
          //context.secrets.delete('x0_tokens');
          const nameSpaceToDelete = await vscode.window.showQuickPick(
            Object.keys(parsedTokens),
            {
              placeHolder: 'Pick what namespace to delete from memory'
            }
          );
          if (!nameSpaceToDelete) return;
          try {
            const successString = `Deleted the namespace: "${nameSpaceToDelete}". \nHeres the token: "${parsedTokens[nameSpaceToDelete]}"`;
            delete parsedTokens[nameSpaceToDelete];
            await context.secrets.delete('x0_tokens');
            if (Object.keys(parsedTokens).length > 1) {
              context.secrets.store('x0_tokens', JSON.stringify(parsedTokens));
            }
            msg.success(successString);
          } catch (e) {
            // TODO: tell user something went wrong
            console.log(e);
          }
          return;
        } else if (
          selectNameSpace.includes(
            '> Reset token for existing namespace (if your token ever gets compromised)'
          )
        ) {
          const selectNameSpaceToReset = await vscode.window.showQuickPick(
            Object.keys(parsedTokens),
            {
              placeHolder:
                'Pick the namespace that you want to reset the token for.'
            }
          );
          if (!selectNameSpaceToReset) return;
          const res = await http.resetToken(
            selectNameSpaceToReset,
            parsedTokens[selectNameSpaceToReset]
          );
          console.log(res);
          try {
            const newTokenObject = JSON.parse(res.data.toString());
            console.log(newTokenObject);
            if (newTokenObject.token) {
              msg.info(`Heres your new token: ${newTokenObject.token}`);
              parsedTokens[selectNameSpaceToReset] = newTokenObject.token;
              await context.secrets.delete('x0_tokens');
              context.secrets.store('x0_tokens', JSON.stringify(parsedTokens));
              // TODO: save new token to secrets store;
            } else if (newTokenObject.messages) {
              msg.error(
                `Something went wrong. Heres the message: ${newTokenObject.messages[0]}`
              );
            }
          } catch (e) {
            console.log(e);
          }
          return;
        } else if (
          selectNameSpace.includes(
            '> Modify an existing namespace (For when your token has changed)'
          )
        ) {
          return;
        } else if (
          selectNameSpace.includes(
            '> Register a new namespace (Requires invite)'
          )
        ) {
          return;
        }

        const customKey = await vscode.window.showInputBox({
          prompt:
            'Do you want to use a custom key for this paste? If so enter it now. If not just cancel this input',
          placeHolder: '"github" or "readme"for example.'
        });
        const res = await http.paste(
          selectNameSpace,
          parsedTokens[selectNameSpace],
          text,
          customKey
        );

        const apiResponse = await JSON.parse(res.data.body.toString());
        if (apiResponse.messages) {
          msg.error(`The following error occured: ${apiResponse.messages[0]}`);
          return;
        }
        if (apiResponse.namespace && apiResponse.key) {
          const pasteUrl =
            'https://x0.tf/' + apiResponse.namespace + '/' + apiResponse.key;
          msg.info(`Heres your link: ${pasteUrl}`);
        }
      }
    }
  );

  context.subscriptions.push(paste_disposable);
}

// this method is called when your extension is deactivated
// eslint-disable-next-line
export function deactivate() {}
