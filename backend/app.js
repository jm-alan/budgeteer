import appBuilder from './appBuilder';
import { ports } from './config';

const apps = {};

for (const port of ports) appBuilder(apps, port);

module.exports = apps;
