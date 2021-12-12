# Node Boilerplate code following Clean Architecture and DDD


Following Clean Architecture guidelines.
  - Separation of concerns
  - Dependency inversion
  - Dependency injection
  - Adapters to decouple from external libraries


__Directories:__
  - core/                   Common logic shared by modules.
  - modules/
    - domain/
    - repos/
    - useCases/
    - Controller.ts
    - Routes.ts

  - infrastructure/         Adapters for external libraries
    - config/               Load config from environment vars
    - express/              Express adapter, middlewares and server configuration
    - logger/
    - orm/
      - sequelize/
    - security/             Adapters and helper functions for password hashing and jwt logic

  - tests                   setup logic for tests
    - factories             generate data for testing


## Development

1. Run development database locally with:
`docker-compose up;`

2. Have configured the .env file

3. Launch nodemon:
`npm run dev`

4. Run migrations with:
`sequelize-cli db:migrate`

5. Populate db by manually adding users, OR
  seeding the db with `npm run db:seed`

__Requeriments__

  - Nodejs v16 installed
  - Typescript installed
  - Docker and docker-compose installed
  - Create a file .env from .env.example with desired credentials

## Testing

1. Run testing database locally with:
`docker-compose up;`

2. Launch the test command:
`npm run test`

## REST API Design

### Pagination


__Request parameters__

  - page `number >= 1`
  - pageSize `number >= 1`

** Page number starts from 1.

Example total count = 153 and page size at 50

Page 1, from 0-49
Page 2, from 50-99,
Page 3, from 100-149,
Page 4, from 150-153,

__Response example__

```js
{
  _pagination: {
    page: 2,
    pageSize: 50,
    pageCount: 50,
    totalCount: 153,
    links: {
      current: "",
      first: "",
      next: ""
      previous: "",
      last: "",
    }
  },
  records: [
  ]
}
```