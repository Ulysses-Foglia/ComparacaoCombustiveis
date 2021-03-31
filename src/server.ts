import express from 'express';
import routes from './routes';

const app = express();
const port = '3080';

app.use(express.json());

app.use(routes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`**App started on port ${port}**`);
});
