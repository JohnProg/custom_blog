import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressLogger from 'express-logging';
import logger from 'logops';
import dotenv from 'dotenv';
import graphqlHTTP from 'express-graphql';
import Dataloader from 'dataloader';

import Auth from '../middlewares/Authentication';
import ncSchema from '../schema';
import {
  UserController,
  BlogController,
  CommentController
} from '../controllers';

dotenv.config({ silence: true });

const app = express();

app.use(cors());
app.use(expressLogger(logger));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  Auth.decodeToken(req);
  next();
});

app.use('/graphql', (req, res) => {
  const loaders = {
    usersByUserIds: new Dataloader(UserController.getUsersByUserIds),
    blogsByUserIds: new Dataloader(BlogController.getBlogsByUserIds),
    commentsByBlogIds: new Dataloader(CommentController.getCommentsByBlogIds)
  };
  graphqlHTTP({
    schema: ncSchema,
    graphiql: true,
    context: { loaders, authUser: req.auth, authError: req.errors },
    formatError: error => ({
      message: error.message,
      state: error.originalError && error.originalError.state,
      locations: error.locations,
      path: error.path,
    })
  })(req, res);
});

app.get('*', (req, res) => {
  res.json({ message: 'This endpoint is not available yet' });
});

export default app;
