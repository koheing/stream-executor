export interface BaseExecutor {
  stream: (...args: any[]) => Omit<this, 'stream'>
  execute: (...args: any[]) => any
}
