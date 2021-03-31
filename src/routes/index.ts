import { Router } from 'express';
import usersRouter from './users.routes';
import carsRouter from './cars.routes';
import consumptionsRouter from './consumptions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/cars', carsRouter);
routes.use('/consumptions', consumptionsRouter);

routes.get('/', (request, response) => {
  return response.json({ message: 'Comparação Combustíveis!!' });
});

export default routes;
