import Returnobject from '../@types/Returnobject';
import apiUrl from '../util/Constants';
import http from '../util/http';
import msg from '../util/msg';
import { env, workspace } from 'vscode';

const createNewPaste = async (
  namespace: string,
  token: string,
  text: string,
  customKey = ''
): Promise<void> => {
  let url = apiUrl.createNewPaste.replace('%%namespace%%', namespace);
  if (customKey !== '') url = url + '/' + customKey;
  const res: Returnobject = await http.POST(url, token, {
    key: 'content',
    value: text
  });
  if (!res.error && res.data) {
    const config = await workspace.getConfiguration('vsx0');
    if (config.copyLinkToClipboard === true) {
      env.clipboard.writeText(`${apiUrl.baseUrl}${namespace}/${res.data.key}`);
      msg.success(`Copied the link to your clipboard.`);
    } else {
      msg.success(
        `Heres your link: ${apiUrl.baseUrl}${namespace}/${res.data.key}`
      );
    }
  } else {
    msg.warn(`Something went wrong, please try again.`);
  }
};

export default createNewPaste;
