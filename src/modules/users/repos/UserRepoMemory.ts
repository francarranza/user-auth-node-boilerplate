export class UserRepoMemory {
  private memory: any[];

  constructor() {
    this.memory = [];
  }

  findByEmail = async (email: string) => {
    const user = this.memory.find(user => user.email === email);
    return Promise.resolve(user);
  };

  create = async (user: { email: string; password: string }) => {
    this.memory.push(user);
    return Promise.resolve(user);
  };
}
