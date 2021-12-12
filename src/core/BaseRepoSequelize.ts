import { validate } from 'uuid';
import { ILogger } from '../infrastructure/logger';
import { RepositoryError } from './BaseErrors';

export interface PaginationParams {
  offset: number;
  limit: number;
  search: string;
}

export interface QueryOptions {
  include?: string[];
  where?: any;
  filter?: any;
  order?: any;
  pagination?: {
    page: number;
    pageSize: number;
  };
}

interface IRepo<T> {
  findAll(opts?: QueryOptions): Promise<T[]>;
  findBy(key: string, value: any, opts?: QueryOptions): Promise<T[]>;
  findById(id: number, opts?: QueryOptions): Promise<T | null>;
  findByUuid(uuid: string, opts?: QueryOptions): Promise<T | null>;
  create(body: T): Promise<T>;
  update(body: T): Promise<T>;
}

export class BaseRepoSequelize<Entity> implements IRepo<Entity> {
  readonly model;
  readonly entity;
  logger: ILogger;

  constructor(model: any, entity: any, logger: ILogger) {
    this.model = model;
    this.entity = entity;
    this.logger = logger;
  }

  findAll = async (opts: QueryOptions = {}) => {
    try {
      const all = await this.model.findAll(opts);
      return all.map((elem: Entity) => new this.entity(elem));
    } catch (err) {
      this.logger.error(
        `BaseRepoSequelize.findAll<${this.entity.name}>: ${err.message}`,
        err,
      );
      throw new RepositoryError(this.entity.name, err.message, err.stack)
    }
  };

  findBy = async (key: string, value: any, opts: QueryOptions = {}) => {
    try {
      const all = await this.model.findAll({
        ...opts,
        where: { [key]: value },
      });
      return all.map((elem: Entity) => new this.entity(elem));
    } catch (err) {
      this.logger.error(
        `BaseRepoSequelize.findBy<${this.entity.name}>: ${err.message}`,
        err,
      );
      throw err;
    }
  };

  findById = async (id: number, opts: QueryOptions = {}) => {
    try {
      const retrieved = await this.model.findByPk(id, opts);
      if (!retrieved) return null;
      return new this.entity(retrieved);
    } catch (err) {
      this.logger.error(
        `BaseRepoSequelize.findById<${this.entity.name}>: ${err.message}`,
        err,
      );
      throw err;
    }
  };

  findByUuid = async (
    uuid: string,
    opts: QueryOptions = {},
  ): Promise<Entity | null> => {
    try {
      if (!validate(uuid)) return null;
      const retrieved = await this.model.findOne({ ...opts, where: { uuid } });
      if (!retrieved) return null;
      return new this.entity(retrieved);
    } catch (err) {
      this.logger.error(
        `BaseRepoSequelize.findByUuid<${this.entity.name}>: ${err.message}`,
        err,
      );
      throw err;
    }
  };

  create = async (body: Entity) => {
    try {
      const created = await this.model.create(body);
      if (!created) return null;
      return new this.entity(created);
    } catch (err) {
      this.logger.error(
        `BaseRepoSequelize.create<${this.entity.name}>: ${err.message}`,
        err,
      );
      throw err;
    }
  };

  update = async body => {
    try {
      await this.model.update(body, { where: { id: body.id } });
      return await this.findById(body.id);
    } catch (err) {
      this.logger.error(
        `BaseRepoSequelize.update<${this.entity.name}>: ${err.message}`,
        err,
      );
      throw err;
    }
  };
}
