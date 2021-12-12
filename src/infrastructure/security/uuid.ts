import { v4 as genuuid } from 'uuid';

export const genUuid4 = (): string => {
  return genuuid();
};
