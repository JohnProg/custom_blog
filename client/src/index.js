import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './css/index.css';
import App from './js/components/App';
import Main from './js/components/Main';
import SingleBlog from './js/components/SingleBlog';
import PostFormPage from './js/components/PostFormPage';
import registerServiceWorker from './registerServiceWorker';
import { getToken } from './js/utils/setAuth';
import PrivateRoute from './js/utils/PrivateRoute';
import './css/blog.css';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';

const client = new ApolloClient({
  url: '/graphql',
  request: async (operation) => {
    const token = await getToken();
    operation.setContext({
      headers: {
        'cb-token': token 
      }
    });
  },
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path='/' component={Main}/>
          <Route exact path='/blog/:blogId' component={SingleBlog} />
          <PrivateRoute path='/blog/create/post' component={PostFormPage} />
        </Switch>
      </App>
    </BrowserRouter>
  </ApolloProvider>
);

render(<ApolloApp />, document.getElementById('root'));
registerServiceWorker();
