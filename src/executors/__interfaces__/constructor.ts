import { BaseExecutor } from './base.executor'

export interface Constructor<T extends BaseExecutor> {
  new (...args: any[]): T
}
