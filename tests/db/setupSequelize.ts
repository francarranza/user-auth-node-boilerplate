import { sequelize } from '../../src/infrastructure/orm/sequelize/models';

class SetupSequelizeTestingDb {

  private sequelize;

  constructor({ sequelize }) {
    this.sequelize = sequelize;
    this.sequelize.options.logging = () => { };
  }

  private checkTestingEnv() {
    if (process.env.NODE_ENV !== 'test') process.exit(1);
  }

  private async syncDb() {
    this.checkTestingEnv();
    await this.sequelize.sync();
    console.log('Database synced!');
  }

  public async dropAllData() {
    this.checkTestingEnv();

    let models = Object.assign({}, this.sequelize.models);
    let deleteOrder = [
      'User',
    ];

    for (let i = 0; i < deleteOrder.length; i++) {
      const modelName = deleteOrder[i];
      const model = models[modelName];
      if (model) {
        await model.destroy({ where: {} });
      }
    }

  }

  public async cleanedDb() {
    await this.syncDb();
    await this.dropAllData();
  }

}

const testingDB = new SetupSequelizeTestingDb({ sequelize });

export {
  testingDB
}