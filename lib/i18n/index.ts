/*
 * This script converts an XML of bettermarks content into JSON.
 *
 * It can be run from the top-level folder of the bm-toolbox repo:
 *
 * $ npm run i18n-convert <file.xml> <namespace> <output-path>
 *
 * or:
 *
 * $ yarn i18n-convert <file.xml> <namespace> <output-path>
 */

import * as fs from 'fs';
import * as path from 'path';
import {defaultTo, set, isString} from 'lodash';
import {DOMParser} from 'xmldom';

const USAGE = `
Usage:

yarn i18n-convert <file.xml> <namespace> <output-path>

or:

npm run i18n-convert <file.xml> <namespace> <output-path>

For example:

$ yarn i18n-convert i18n.xml Editors src/testplayer/i18n

Will convert the file 'i18n.xml' into JSON files in the folder
'./src/testplayer/i18n/[...].json'.

Each JSON will have all its keys wrapped under the key "Editors".
`;

if (process.argv.length !== 5) {
  console.error('Incorrect number of arguments.\n');
  console.error(`
This script converts an i18n xml file into JSON files in the current directory.
The emitted files are named <language>.json (e.g., "en.json", "de.json").

    ${USAGE}
`);

  process.exit(1);
}

const xmlFilename = process.argv[2];

if (!fs.existsSync(xmlFilename)) {
  console.error(`File not found: ${xmlFilename}`);
  process.exit(1);
}

const namespace = process.argv[3];

if (!isString(namespace)) {
  console.error(`Please specify a namespace for the i18n JSON files.`);
  console.error(USAGE);
  process.exit(1);
}

const outputPath = path.resolve(defaultTo(process.argv[4], __dirname));

try {
  if (!fs.lstatSync(outputPath).isDirectory()) {
    throw new Error('Please provide a valid path for <output-path>');
  }
} catch (err) {
  console.error(err);
  console.error(USAGE);
  process.exit(1);
}

const {parseFromString} = new DOMParser();
const xml = parseFromString(fs.readFileSync(xmlFilename, 'utf-8'));
const localesElement = xml.getElementsByTagName('locales');

if (localesElement.length !== 1) {
  console.error(`XML file must contain one and only one <locales> element.`);
  process.exit(1);
}

const i18nElements = localesElement[0].getElementsByTagName('i18n');

if (i18nElements.length < 1) {
  console.error(`XML file must contain at least one <i18n> element.`);

  process.exit(1);
}

Array.prototype.slice.apply(i18nElements).forEach((i18nElement: Element) => {
  const lang = i18nElement.attributes.getNamedItem('locale').value;
  const i18n: any = {};
  const stringElements = i18nElement.getElementsByTagName('string');

  Array.prototype.slice.apply(stringElements).forEach((stringElement: Element) => {
    const key = stringElement.attributes.getNamedItem('key').value;
    const str = stringElement.textContent;

    // nested keys like "button.tooltip.minusButton" should become nested objects:
    // {"button": {"tooltop": {"minusButton": ...}}}
    const pathKey = [namespace, ...key.split('.')];

    set(i18n, pathKey, str);
  });

  const jsonPath = path.resolve(outputPath, `${lang}.json`);
  const json = JSON.stringify(i18n, null, 2);

  console.log(`Writing file: ${jsonPath}`);

  fs.writeFileSync(jsonPath, json);
});

