/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServiceError } from './ServiceError';
import { ErrorCode } from './model';
import { assertNever } from '../assertNever';
import debug from 'debug';
import cli from 'cli-ux';
const d = debug('errorHandler');

export const errorHandler = (error: Error) => {
  cli.action.stop();

  if (error instanceof ServiceError) {
    switch (error.code) {
      case ErrorCode.AUTHORIZATION_ERROR:
        console.error(error.message);
        d(error.stack);
        process.exit(1); //mandatory (as per the Node.js docs)
      case ErrorCode.SERVICE_ERROR:
      case ErrorCode.NOT_IMPLEMENTED_ERROR:
      case ErrorCode.INTERNAL_ERROR:
      case ErrorCode.ARGUMENT_ERROR:
        cli.error(error);
      default:
        assertNever(error.code);
    }
  }

  throw error;
};
