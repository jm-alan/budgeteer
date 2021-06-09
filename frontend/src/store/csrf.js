import Cookies from 'js-cookie';

class CsrfFetch {
  constructor () {
    this.options = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }

  async get (url, paramsObj) {
    paramsObj && (url += '?');
    for (const key in paramsObj) url += `&${key}=${paramsObj[key]}`;
    const res = await window.fetch(url);
    if (res.status >= 400) throw (await res.json());
    else return await res.json();
  }

  async post (url, body) {
    return await this.__forwardFetch(url, body, 'POST');
  }

  async patch (url, body) {
    return await this.__forwardFetch(url, body, 'PATCH');
  }

  async delete (url, body) {
    return await this.__forwardFetch(url, body, 'DELETE');
  }

  async __forwardFetch (url, body, method) {
    body = JSON.stringify(body);
    const res = await window.fetch(url, { ...this.options, method, body });
    if (res.status >= 400) throw (await res.json());
    else return await res.json();
  }

  setToken () {
    this.options.headers['XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');
  }

  async restoreCSRF () {
    await window.fetch('/api/csrf/restore/');
  }
}

export default new CsrfFetch();
