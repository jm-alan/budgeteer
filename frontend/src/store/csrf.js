import Cookies from 'js-cookie';

async function fetch (url, options = {}) {
  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== 'GET') {
    // do not set content type if attempting photo upload
    if (options.headers['Content-Type'] === 'multipart/form-data') {
      delete options.headers['Content-Type'];
    } else {
      options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    }
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }
  const res = await window.fetch(url, options);

  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    res.data = await res.json();
  }

  if (res.status >= 400) throw res;

  return res;
}
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
