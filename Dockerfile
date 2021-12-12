FROM node:16-alpine as deps
WORKDIR /app
COPY package*.json /app
RUN yarn install

FROM deps
WORKDIR /app
COPY . /app
RUN npm run build
EXPOSE 8080
CMD ["npm", "start"]
