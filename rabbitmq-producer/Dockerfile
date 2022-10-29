FROM node:16
WORKDIR /src/rabbit-producer

RUN npx express-generator
RUN npm install
RUN npm install amqplib

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]