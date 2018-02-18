
const routes = (app) => {
  app.post('/api/v1/user', (req, res) => {
    res.send({ message: 'Post User' });
  });

  app.get('/api/v1/users', (req, res) => {
    res.send({ message: 'Get all users' });
  });

  app.get('/api/v1/user/:userId', (req, res) => {
    res.send({ message: 'Get a user' });
  });

  app.put('/api/v1/user/:userId', (req, res) => {
    res.send({ message: 'Edit a user' });
  });

  app.delete('/api/v1/user/:userId', (req, res) => {
    res.send({ message: 'Delete a user' });
  });
};

export default routes;
