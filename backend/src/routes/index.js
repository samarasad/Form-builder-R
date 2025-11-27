import express from 'express';
const router = express.Router();
import formSchemaRouter from './formSchema.js';


//notes routes
router.use('/form', formSchemaRouter);
export default router;