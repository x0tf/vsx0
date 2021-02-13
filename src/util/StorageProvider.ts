import { ExtensionContext } from 'vscode';

const storageProvider = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: async (
    context: ExtensionContext,
    key: string
  ): Promise<string | void> => {
    const objectToParse = await context.secrets.get('x0_tokens');
    objectToParse ? await JSON.parse(objectToParse)[key] : undefined;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAll: async (context: ExtensionContext): Promise<any> => {
    const objectToParse = await context.secrets.get('x0_tokens');
    objectToParse ? await JSON.parse(objectToParse) : undefined;
  },
  set: async (
    context: ExtensionContext,
    key: string,
    value: string
  ): Promise<void> => {
    const objectToParse = await context.secrets.get('x0_tokens');
    if (objectToParse) {
      const parsedObject = JSON.parse(objectToParse);
      parsedObject[key] = value;
      await context.secrets.delete('x0_tokens');
      return context.secrets.store('x0_tokens', JSON.stringify(parsedObject));
    } else {
      const tokenObjectToStoreLater = {};
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      tokenObjectToStoreLater[key] = value;
      return context.secrets.store(
        'x0_tokens',
        JSON.stringify(tokenObjectToStoreLater)
      );
    }
  },
  delete: async (context: ExtensionContext, key: string): Promise<boolean> => {
    const objectToParse = await context.secrets.get('x0_tokens');
    if (objectToParse) {
      const parsedObject = JSON.parse(objectToParse);
      delete parsedObject[key];
      try {
        await context.secrets.store('x0_tokens', JSON.stringify(parsedObject));
      } catch (e) {
        return false;
      }
      return true;
    }
    return false;
  },
  deleteAll: async (context: ExtensionContext): Promise<void> => {
    return context.secrets.delete('x0_tokens');
  }
};

export default storageProvider;
