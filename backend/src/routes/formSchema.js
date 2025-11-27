import express from 'express';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const router = express.Router();

const formSchemaData = require('../db/formSchema.json');

router.get('/schema', (req, res) => {
    res.send(formSchemaData);
});

export default router;
