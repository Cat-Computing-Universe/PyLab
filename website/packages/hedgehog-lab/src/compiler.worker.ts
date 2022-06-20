import * as Comlink from 'comlink';
import { transpile } from '@hedgehog/core';

const compilerWorker = {
  compile: (e: any) => e
};

Comlink.expose(compilerWorker);

export default null as any;
