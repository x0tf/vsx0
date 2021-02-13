import StorageProvider from '../util/StorageProvider';
import Returnobject from '../@types/Returnobject';
import { ExtensionContext, window } from 'vscode';
import apiUrl from '../util/Constants';
import http from '../util/http';
import msg from '../util/msg';

const resetToken = async (context: ExtensionContext): Promise<void> => {
  const allTokens = await StorageProvider.getAll(context);
  const namespace = await window.showQuickPick(Object.keys(allTokens), {
    placeHolder: 'Pick the namespace to reset'
  });
  if (!namespace) return;
  const res: Returnobject = await http.POST(
    apiUrl.resetToken.replace('%%namespace%%', namespace),
    allTokens[namespace],
    {}
  );
  if (!res.error && res.data.token) {
    await StorageProvider.set(context, namespace, res.data.token);
    msg.success(
      `Reset the namespace "${namespace}" for you. Heres the new token: "${res.data.token}"`
    );
  }
};

export default resetToken;
