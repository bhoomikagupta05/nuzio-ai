import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import newsRoutes from './newsRoutes.js';
import aiRoutes from './aiRoutes.js';

const apiRouter = Router();

// Mount API routers
apiRouter.use('/health', healthRoutes);
apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/news', newsRoutes);
apiRouter.use('/ai', aiRoutes);

export default apiRouter;
