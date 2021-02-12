// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as c from '@aero/centra';
import Returnobject from '../@types/Returnobject';

const apiUrlV1 = 'https://api.x0.tf/v1/';
const returnobject: Returnobject = { error: false };

const http = {
  paste: async (
    namespace: string,
    token: string,
    text: string,
    key?: string
  ): Promise<Returnobject> => {
    let url = apiUrlV1 + 'elements/' + namespace + '/paste';
    if (key) url = url + '/' + key;
    const response = await c(url, 'POST')
      .header('Authorization', 'Bearer ' + token)
      .body(
        {
          content: text
        },
        'json'
      )
      .send();
    if (response.statusCode >= 200 && response.statusCode <= 300) {
      try {
        returnobject.data = response.json();
      } catch (e) {
        returnobject.error = true;
        returnobject.errortrace = e;
        returnobject.data = response;
      }
    } else {
      try {
        returnobject.error = true;
        returnobject.errormsg = await response;
      } catch (e) {
        returnobject.error = true;
        returnobject.errortrace = e;
        returnobject.data = response;
      }
    }
    return returnobject;
  },
  register: async (
    namespace: string,
    invite: string
  ): Promise<Returnobject> => {
    const url = apiUrlV1 + 'namespaces/' + namespace;
    const response = await c(url, 'POST')
      .body(
        {
          invite: invite
        },
        'json'
      )
      .send();
    if (response.statusCode >= 200 && response.statusCode <= 300) {
      try {
        returnobject.data = response.json();
      } catch (e) {
        returnobject.error = true;
        returnobject.errortrace = e;
        returnobject.data = response;
      }
    } else {
      returnobject.error = true;
      returnobject.data = response;
    }
    return returnobject;
  },
  resetToken: async (
    namespace: string,
    token: string
  ): Promise<Returnobject> => {
    const url = apiUrlV1 + 'namespaces/' + namespace + '/resetToken';
    const res = await c(url, 'POST')
      .header('Authorization', 'Bearer ' + token)
      .send();

    console.log(res);
    returnobject.data = res;
    if (res.statusCode >= 200 && res.statusCode <= 300) {
      try {
        returnobject.data = await res.body;
      } catch (e) {
        returnobject.error = true;
        returnobject.errortrace = e;
      }
    }
    return returnobject;
  }
};

export default http;
