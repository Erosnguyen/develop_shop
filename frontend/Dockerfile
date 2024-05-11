FROM node:latest

WORKDIR /app

COPY package.json ./

RUN npm install && npm run build

COPY . .

EXPOSE 5173
WORKDIR /app/frontend
CMD ["npm", "run", "dev"]