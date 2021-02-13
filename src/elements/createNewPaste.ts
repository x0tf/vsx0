import Returnobject from '../@types/Returnobject';
import apiUrl from '../util/Constants';
import http from '../util/http';
import msg from '../util/msg';

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
    msg.success(
      `Heres your link: ${apiUrl.baseUrl}${namespace}/${res.data.key}`
    );
  } else {
    msg.warn(`Something went wrong, please try again.`);
  }
};

export default createNewPaste;
