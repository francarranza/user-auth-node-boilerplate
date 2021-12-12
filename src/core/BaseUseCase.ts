export interface IUseCase {
  execute(body?: any): Promise<any>;
}

export class UseCase {}
