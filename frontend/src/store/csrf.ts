import Cookies from 'js-cookie'

interface Params {
  [parameter: string]: string;
}

class CsrfFetch {
  baseUrl: string;
  xsrfToken: string;

  constructor (baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async restoreCSRF () {
    await window.fetch(`${this.baseUrl}/api/csrf/restore/`);
    this.xsrfToken = Cookies.get('XSRF-TOKEN');
  }

  async get (url: string, params: Params): Promise<any> {
    /**
     * Takes in a target URL and an object representing query parameters as key: value pairs
     * Returns the parsed JSON response
    */
    let finalUrl = `${url}?/`;
    for (const prop in params) finalUrl += `&${prop}=${params[prop]}`;
    const res = await window.fetch(finalUrl);
    return await res.json();
  }

  async post (url: string, body: any): Promise<any> {
    /**
     * Takes in a target URL and a body of any shape
     * Returns parsed JSON response
     */
    body = JSON.stringify(body);
    const res = await window.fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'XSRF-Token': this.xsrfToken
      },
      body
    });
    return await res.json();
  }
}

export default new CsrfFetch(process.env.);
