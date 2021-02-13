// apiUrlV1 = 'https://api.x0.tf/v1/';

const apiUrl = {
  //  const url = apiUrlV1 + 'namespaces/' + namespace;
  baseUrl: 'https://x0.tf/',
  register: 'https://api.x0.tf/v1/namespaces/%%namespace%%',
  resetToken: 'https://api.x0.tf/v1/namespaces/%%namespace%%/resetToken',
  createNewPaste: 'https://api.x0.tf/v1/elements/%%namespace%%/paste'
};

export default apiUrl;
