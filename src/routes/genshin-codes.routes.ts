import { Router } from 'express';
import fs from 'node:fs/promises';
import wrap from '../middlewares/wrap';

const router = Router();

router.get(
  '/all',
  wrap(async (req, res) => {
    const data = await fs.readFile('./src/storages/local/all.json', 'utf8');
    res.json(JSON.parse(data));
  }),
);

router.get(
  '/valid',
  wrap(async (req, res) => {
    const data = await fs.readFile('./src/storages/local/valid.json', 'utf8');
    res.json(JSON.parse(data));
  }),
);

router.get(
  '/expired',
  wrap(async (req, res) => {
    const data = await fs.readFile('./src/storages/local/expired.json', 'utf8');
    res.json(JSON.parse(data));
  }),
);

export default router;
