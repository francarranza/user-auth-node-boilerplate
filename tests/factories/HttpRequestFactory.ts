import { httpRequest } from "../../src/infrastructure/express/RequestResponseAdapter"

type headers = {
  'Content-Type': string,
  'Referer'?: string,
  'User-Agent'?: string,
  'session-id': string,
}

type Props = {
  body?: any;
  query?: any;
  params?: any;
  ip?: string;
  method?: string;
  path?: string;
  file?: any;
  statusCode?: number | null;
  headers?: headers;
  userId?: string | null;
}

export const httpRequestFactory = (props: Props): httpRequest => {
  return {
    body: props.body || {},
    query: props.query || {},
    params: props.params || {},
    ip: props.ip || '1233',
    method: props.method || 'METHOD',
    path: props.path || '',
    file: props.file,
    statusCode: props.statusCode || null,
    headers: props.headers || {
      'Content-Type': '',
      'Referer': '',
      'User-Agent': '',
    },
    userId: props.userId || null,
  }

}