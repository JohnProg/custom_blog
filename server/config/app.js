import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressLogger from 'express-logging';
import logger from 'logops';
import dotenv from 'dotenv';
import { graphql } from 'graphql';
import graphqlHTTP from 'express-graphql';

import route from './routes';
import ncSchema from '../schema';

dotenv.config({ silence: true });

const app = express();

app.use(cors());
app.use(expressLogger(logger));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

route(app);

app.use('/graphql', graphqlHTTP({
  schema: ncSchema,
  graphiql: true
}));

app.get('*', (req, res) => {
  res.json({ message: 'This endpoint is not available yet' });
});

export default app;
