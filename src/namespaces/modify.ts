import StorageProvider from '../util/StorageProvider';
import { ExtensionContext, window } from 'vscode';
import msg from '../util/msg';

const modify = async (context: ExtensionContext): Promise<void> => {
  const allTokens = await StorageProvider.getAll(context);
  const nameSpaceToModify = await window.showQuickPick(Object.keys(allTokens), {
    placeHolder: 'Pick what namespace to modify'
  });
  if (!nameSpaceToModify) return;
  const newToken = await window.showInputBox({
    prompt: `Enter the new token for "${nameSpaceToModify}"`,
    placeHolder: 'asrighbaeeeehgkjalhgujgeruihjĝreuhgfre'
  });
  if (!newToken) return;
  await StorageProvider.set(context, nameSpaceToModify, newToken);
  msg.success(`Updated "${nameSpaceToModify}" and saved the new token`);
};

export default modify;
