// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as c from '@aero/centra';
import Returnobject from '../@types/Returnobject';

const returnobject: Returnobject = { error: false };

const http = {
  POST: async (
    url: string,
    token: string,
    { key, value }: { key?: string | undefined; value?: string | undefined }
  ): Promise<Returnobject> => {
    console.log(url, token);
    const bodyObject = {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    bodyObject[key] = value;
    try {
      const response = await c(url, 'POST')
        .header('Authorization', 'Bearer ' + token)
        .body(bodyObject, 'json')
        .send();
      returnobject.data = JSON.parse(response.body.toString());
      return returnobject;
    } catch (e) {
      console.error(e);
      returnobject.error = true;
      returnobject.errortrace = e;
      returnobject.errormsg = e.toString();
      return returnobject;
    }
  }
};

export default http;
