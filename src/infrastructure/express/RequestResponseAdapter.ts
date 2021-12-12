import { logger } from '../logger';

type headers = {
  'Content-Type': string;
  Referer?: string;
  'User-Agent'?: string;
};

export type httpRequest = {
  body: any;
  query: any;
  params: any;
  ip: string;
  method: string;
  path: string;
  file: any;
  statusCode: number | null;
  headers: headers;
  userId: string | null;
};

export type httpResponse = {
  headers: headers;
  statusCode: number;
  body?: any;
};

export function makeReqResAdapter(controller) {
  return (req, res) => {
    const httpRequest: httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      userId: req.userId,
      file: req.file,
      statusCode: null,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
      },
    };
    controller(httpRequest)
      .then((httpResponse: httpResponse) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.type('json');
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch(error => {
        logger.error(error);
        res.status(500).send({ error: 'An unkown error occurred.' });
      });
  };
}
