import { createServer } from 'node:http';
import logger from '@config/logger.js';

export interface PortCheckResult {
  port: number;
  available: boolean;
  error?: string;
}

/**
 * Check if a specific port is available
 */
export const checkPort = (port: number): Promise<PortCheckResult> => {
  return new Promise((resolve) => {
    const server = createServer();

    server.listen(port, () => {
      server.close(() => {
        resolve({ port, available: true });
      });
    });

    server.on('error', (error: NodeJS.ErrnoException) => {
      resolve({
        port,
        available: false,
        error: error.message,
      });
    });
  });
};

/**
 * Find the next available port starting from a given port
 */
export const findAvailablePort = async (
  startPort: number,
  maxAttempts: number = 10,
): Promise<number> => {
  for (let i = 0; i < maxAttempts; i++) {
    const currentPort = startPort + i;
    const result = await checkPort(currentPort);

    if (result.available) {
      if (i > 0) {
        logger.info(
          `Found available port: ${currentPort} (after ${i} attempts)`,
        );
      }
      return currentPort;
    }

    logger.debug(`Port ${currentPort} is busy: ${result.error}`);
  }

  throw new Error(
    `No available port found after ${maxAttempts} attempts starting from ${startPort}`,
  );
};

/**
 * Get a random available port in a range
 */
export const getRandomAvailablePort = async (
  minPort: number = 3000,
  maxPort: number = 9000,
): Promise<number> => {
  const randomPort =
    Math.floor(Math.random() * (maxPort - minPort + 1)) + minPort;

  try {
    return await findAvailablePort(randomPort, 5);
  } catch {
    // If random port fails, try sequential search
    return await findAvailablePort(minPort, 20);
  }
};

/**
 * Check multiple ports at once
 */
export const checkMultiplePorts = async (
  ports: number[],
): Promise<PortCheckResult[]> => {
  return Promise.all(ports.map((port) => checkPort(port)));
};
