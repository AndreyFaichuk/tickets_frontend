FROM node:18

RUN node -v
RUN npm -v

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev"]
