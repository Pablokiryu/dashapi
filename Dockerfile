FROM node:10.9.0-alpine
WORKDIR usr/src/app/
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV MONGOURI=MONGOURI
RUN adduser -D myuser
USER myuser
CMD ["npm", "start"]