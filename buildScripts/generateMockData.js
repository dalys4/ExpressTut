import jsf from 'json-schema-faker';
import faker from 'faker';
import fs from 'fs';
import chalk from 'chalk';
import { schema } from './mockDataSchema';

jsf.extend('faker', () => faker);
const json = JSON.stringify(jsf.generate(schema));

fs.writeFile('./src/api/db.json', json, (err) => {
  if (err) {
    return console.log(chalk.red(err)); // eslint-disable-line no-console
  }

  console.log(chalk.green('Mock data generated')); // eslint-disable-line no-console
});
