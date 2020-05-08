export interface BaseExecutor {
  readonly initialValue: any
  stream: (...args: any[]) => Omit<this, 'stream'>
  execute: (...args: any[]) => any
}
