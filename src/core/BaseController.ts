const defaultHeaders = {
  'Content-Type': 'application/json',
};

export type Response = {
  headers: any;
  statusCode: number;
  body?: any;
};

export type PaginationResponse<T> = {
  _pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    links: {
      current: string;
      first: string;
      next: string;
      previous: string;
      last: string;
    };
  };
  records: Array<T>;
};

export const DEFAULT_PAGE_SIZE = 10;

export class BaseController {
  private makeResponse(statusCode: number, body?: any) {
    const response: Response = { headers: defaultHeaders, statusCode, body };
    return response;
  }

  public ok = (body: any) => {
    return this.makeResponse(200, body);
  };

  public created = (body: any) => {
    return this.makeResponse(201, body);
  };

  public unauthorized = () => {
    return this.makeResponse(401, { error: 'Unauthorized' });
  };

  public forbidden = () => {
    return this.makeResponse(403, { error: 'Forbidden' });
  };

  public clientError = (message?: string) => {
    return this.makeResponse(400, { error: message || 'Client Error' });
  };

  public fail = () => {
    return this.makeResponse(500, { error: 'Server Error' });
  };
}
