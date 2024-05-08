import express from 'express';
import { configureRoutes } from './startup/routes';
import { configureMiddlewares } from './startup/middlewares';
import { handleConnection } from './startup/connection';

const app = express();

configureMiddlewares(app);
configureRoutes(app);
handleConnection(app);
