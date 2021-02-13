import StorageProvider from '../util/StorageProvider';
import { ExtensionContext, window } from 'vscode';
import msg from '../util/msg';

const submitNew = async (context: ExtensionContext): Promise<void> => {
  const nameSpace = await window.showInputBox({
    prompt: 'Enter your already existing namespace',
    placeHolder: 'example'
  });
  if (!nameSpace) return;
  const userToken = await window.showInputBox({
    prompt: 'Enter the token now, it will look something like this: ',
    placeHolder: 'fbaelzugfjwnwara7z4hg89guab4-afrg7euj4e.awf7gzb'
  });
  if (!userToken) return;
  try {
    await StorageProvider.set(context, nameSpace, userToken);
    msg.success(`Saved the namespace "${nameSpace}"!`);
  } catch (e) {
    msg.error(
      'Something went wrong while trying to save your namespace, please try again.'
    );
  }
};

export default submitNew;
