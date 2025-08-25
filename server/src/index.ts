import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Configuration imports
import { env, hasRealApiKey } from './config/environment';
import { dynamicCorsConfig } from './config/cors';
import { generalRateLimit } from './config/rateLimit';

// Route imports
import aiRoutes from './routes/ai';

// Middleware imports
import { globalErrorHandler, notFoundHandler } from './middleware/errorHandler';

// Constants
import { REQUEST_BODY_LIMIT, SERVICE_NAME } from './constants';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors(dynamicCorsConfig));

// Body parsing middleware
app.use(express.json({ limit: REQUEST_BODY_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: REQUEST_BODY_LIMIT }));

// General rate limiting
app.use(generalRateLimit);

// Trust proxy for accurate IP addresses (important for rate limiting)
app.set('trust proxy', 1);

// Routes
app.use('/api/ai', aiRoutes);

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(globalErrorHandler);

// Start server
app.listen(env.PORT, () => {
  console.log(`🚀 ${SERVICE_NAME} running on port ${env.PORT}`);
  console.log(
    `🌍 CORS enabled for: ${Array.isArray(dynamicCorsConfig.origin) ? dynamicCorsConfig.origin.join(', ') : dynamicCorsConfig.origin}`
  );
  console.log(
    `🔑 OpenAI API key: ${hasRealApiKey() ? '✅ Configured' : '❌ Not configured (using mock responses)'}`
  );
  console.log(`🤖 AI endpoint: http://localhost:${env.PORT}/api/ai/generate`);
});

export default app;
