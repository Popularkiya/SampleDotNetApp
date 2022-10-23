FROM node:16
WORKDIR /src/rabbit-producer

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .

RUN npm install
RUN npm install amqplib

EXPOSE 9092
CMD [ "npm", "start" ]