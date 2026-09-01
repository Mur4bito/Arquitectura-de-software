import { Router } from 'express';
import { authService } from './auth.service.js';

const router = Router();

router.post('/', (req, res) => {
    try {
        const token = authService.login(req.body);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

export default router;