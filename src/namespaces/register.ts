import StorageProvider from '../util/StorageProvider';
import Returnobject from '../@types/Returnobject';
import { ExtensionContext, window } from 'vscode';
import apiUrl from '../util/Constants';
import http from '../util/http';
import msg from '../util/msg';

const register = async (context: ExtensionContext): Promise<void> => {
  const namespace = await window.showInputBox({
    prompt: 'Enter your desired name for the namespace now',
    placeHolder: '"vsx0"for example'
  });
  if (!namespace) return;

  const res: Returnobject = await http.POST(
    apiUrl.register.replace('%%namespace%%', namespace),
    '',
    {}
  );
  if (!res.data.error && res.data.token) {
    await StorageProvider.set(context, namespace, res.data.token);
    msg.success(
      `Registered and saved "${namespace}" for you. Heres the token: "${res.data.token}" (Save it well!)`
    );
  }
};

export default register;
