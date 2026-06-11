import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection', err);
  process.exit(1);
});

await connectDB();
app.listen(env.port, () => console.log(`API listening on port ${env.port}`));
