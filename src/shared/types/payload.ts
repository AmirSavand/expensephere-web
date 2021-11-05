export type Payload<T> = {
  [P in keyof T]?: any;
};
