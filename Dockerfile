FROM node:21.7.2

WORKDIR /usr/src/api

COPY . .

COPY ./.env.production ./.env

RUN npm install --quiet --no-optional --no-found --loglevel=error

RUN npm run build

EXPOSE 3000
EXPOSE 3307

CMD ["npm","run","start:prod"]
