import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const iamRouter = Router();

iamRouter.get('/roles', (req, res) => {
  res.json({ message: 'roles' }).status(StatusCodes.OK);
});
export default iamRouter;
