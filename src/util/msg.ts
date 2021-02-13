import { window } from 'vscode';

const msg = {
  info: (msg: string): Thenable<string | undefined> =>
    window.showInformationMessage(msg),
  warn: (msg: string): Thenable<string | undefined> =>
    window.showWarningMessage(msg),
  error: (msg: string): Thenable<string | undefined> =>
    window.showErrorMessage(msg),
  success: (msg: string): Thenable<string | undefined> =>
    window.showInformationMessage('✅ ' + msg)
};

export default msg;
