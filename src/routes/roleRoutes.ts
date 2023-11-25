import express from 'express';

const router = express.Router();

const roles = ['source', 'sink', 'auditor', 'admin'];

router.get('/roles', (req, res) => {
  res.json(roles);
});

export default router;
