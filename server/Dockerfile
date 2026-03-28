FROM node:23-alpine AS builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

FROM node:23-alpine


WORKDIR /app


COPY --from=builder /app /app

EXPOSE 3000

CMD ["npm", "start"]
