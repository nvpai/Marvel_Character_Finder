//Here is where the server is set up
import express from 'express';
const app = express();
import configRoutes from './routes/index.js';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import exphbs from 'express-handlebars';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Only load dotenv in development
if (process.env.NODE_ENV !== 'production') {
  import('dotenv').then(dotenv => dotenv.config());
}

const staticDir = express.static(__dirname + '/public');

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  // If the user posts to the server with a property called _method, rewrite the request's method
  // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
  // rewritten in this middleware to a PUT route
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }

  // let the next middleware run:
  next();
};

app.use('/public', staticDir);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(rewriteUnsupportedBrowserMethods);

// app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
  extname: '.handlebars'
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

configRoutes(app);

// app.listen(3000, () => {
//   console.log("We've now got a server!");
//   console.log('Your routes will be running on http://localhost:3000');
// });
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log("We've now got a server!");
    console.log(`Your routes will be running on http://localhost:${PORT}`);
  });
}

// Export the app for Vercel
export default app;
