import StorageProvider from '../util/StorageProvider';
import { ExtensionContext, window } from 'vscode';
import msg from '../util/msg';

const deleteNamespace = async (context: ExtensionContext): Promise<void> => {
  const allTokens = await StorageProvider.getAll(context);
  const nameSpaceToDelete = await window.showQuickPick(Object.keys(allTokens), {
    placeHolder:
      'Pick what namespace to delete from memory (will not be deleted from the server!)'
  });
  if (!nameSpaceToDelete) return;
  await StorageProvider.delete(context, nameSpaceToDelete);
  msg.success(`Deleted "${nameSpaceToDelete}" from memory.`);
};

export default deleteNamespace;
