FROM node:8.16.0
COPY package*.json ./
RUN npm run global
RUN npm install
COPY . .
EXPOSE 3000 80
CMD [ "npm","run","dev-server" ]