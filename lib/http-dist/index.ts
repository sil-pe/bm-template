import * as express from 'express';
import * as morgan from 'morgan';
import {defaultTo} from 'lodash';
import * as path from 'path';

// process.argv[0] === node binary
// process.argv[1] === path to script (first argument to node)
console.debug('arguments', process.argv);

/**
 * first optional argument is the port number, default is 8080
 */
const portArg = parseInt(defaultTo<string>(process.argv[2], '8080'), 10);
/**
 * second optional argument is the relative or absolute folder to serve, default is ./dist
 */
const pathArg = path.resolve(defaultTo<string>(process.argv[3], './dist'));

console.log('serving', pathArg, 'from port', portArg);
const app = express();

// https://www.npmjs.com/package/morgan#predefined-formats
const logFormat = `[:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length]`;

app.use(morgan(logFormat)); // log some details of every request to SDTOUT
app.use(express.static(pathArg));
app.listen(portArg);
