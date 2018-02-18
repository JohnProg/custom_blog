import http from 'http';
import logger from 'js-logger';

import { app } from './server/config';

logger.useDefaults();
const port = parseInt(process.env.PORT, 10) || 8080;

app.set('port', port);

const server = http.createServer(app);

server.listen(port);

logger.info('server running on', port);
