import * as express from 'express';
import * as request from 'request';
import * as path from 'path';

const app = express();

if (process.env.NODE_ENV == 'dev') {
  app.get('*', (req, res) =>
    request({
      url: 'http://localhost:3000' + req.url,
      method: req.query.method
    }).pipe(res)
  );
} else {
  app.use(express.static(path.join(__dirname, '../client/build')));

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../client/build/index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`environment: ${process.env.NODE_ENV}`);
  console.log('http://localhost:5000');
});
