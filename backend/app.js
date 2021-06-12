import appBuilder from './appBuilder';
import { ports } from './config';

// eslint-disable-next-line no-extend-native
String.prototype.upperCaseFirst = function () {
  return `${this[0].toUpperCase()}${this.slice(1)}`;
};

const apps = {};

for (const port of ports) appBuilder(apps, port);

module.exports = apps;
