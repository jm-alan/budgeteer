import Cookies from 'js-cookie';

export default class CsrfFetch {
  constructor () {
    this.options = {
      headers: {
        'Content-Type': 'application/json',
        'XSRF-Token': Cookies.get('XSRF-TOKEN')
      }
    };

    this.post = this._createFetch('POST');
    this.patch = this._createFetch('PATCH');
    this.delete = this._createFetch('DELETE');
  }

  _createFetch (method) {
    return async (url, body) => {
      body = JSON.stringify(body);
      const res = await window.fetch(url, { ...this.options, method, body });
      return await res.json();
    };
  }

  async get (url, paramsObj) {
    url += '?';
    for (const key in paramsObj) url += `&${key}=${paramsObj[key]}`;
    const res = await window.fetch(url);
    return await res.json();
  }

  static restoreCSRF () {
    window.fetch('/api/csrf/restore/');
  }
}
