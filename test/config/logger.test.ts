import { transports } from 'winston';
import logger from '../../src/config/logger';

describe('Logger Configuration', () => {
  it('should contain console transport', () => {
    const consoleTransport = logger.transports.find(
      (transport) => transport instanceof transports.Console
    );
    expect(consoleTransport).toBeDefined();
  });

  it('should contain file transport', () => {
    const fileTransport = logger.transports.find(
      (transport) => transport instanceof transports.File
    );
    expect(fileTransport).toBeDefined();
  });
});
