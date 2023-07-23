import express from 'express';
import routes from './routes/index';
import file from './utilities/file';

const app: express.Application = express();
const port: number = 3000;

app.use(routes);

app.listen(port, async (): Promise<void> => {
  await file.checkThumbFolderExistOrCreateNew();
});

export default app;
