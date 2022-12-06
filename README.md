# SampleDotNetApp
Application created in ASP.NET Core 5 technology created for the needs of the subject Websites in .NET

* [Short intro](#short-intro)
* [Developement](#developement)
    * [flowerbackend](#flowerbackend)
    * [flower-web-app](#flower-web-app)
    * [rabbitmq-producer](#rabbitmq-producer)
* [How to use this app](#how-to-use-this-app)
    * [Main app](#main-app)
        * [Filtering](#filtering)
        * [Graphs](#graphs)
        * [Saving data](#saving-data)
    * [Data Generator](#data-generator)
* [Authors](#authors)


# Short intro
The aim of the project is to create a demo application that reads messages from the system which are saved in the NoSQL database after conversion. Collected information can be viewed in tabular form (with filters), downloaded (in CSV, JSON form) and visualized in the form of graphs. The data in the queuing system is meant to demonstrate monitoring of IoT measuring devices, i.e. temperature, humidity, gas concentration, UV intensity.

The demo app presented here is created for a flower planation. It collects information about air humidity, uv intensity, temperature and CO2 levels.

The project works on 5 containers.
- rabbitmq - message queue
- flowerbackend - business logic, services, controllers etc
- rabbitmq-producer - mock for data production
- flower-web-app - applicatrion frontend
- mongodb - database

# Developement
## flowerbackend
### Prerequisites
- Visual Studio 2022 with **ASP.NET and web development** workload
- ASP.NET v5.0

### Building
Open the project in Visual Studio and run it with green play button. The swagger should be visible on http://localhost:5000/swagger.

## flower-web-app
### Prerequisites
- NodeJs v16+

### Building
1. Run following commands in flower-web-app folder when setting up the environment for the first time
```
npm install
npm install react-scripts@3.4.1 -g
npm install react-router-dom --save
npm install bootstrap
npm install node-sass
npm install axios
```

2. Now to build it you just have to use `npm start`. The app will be running on http://localhost:4000


## rabbitmq-producer
### Prerequisites
- NodeJs v16+

### Building
1. Run 
```
npm install
npm install amqplib
```

2. To build it you just have to use `npm start`. The app will be running on http://localhost:3000

## Whole containerized app
### Prerequisites
- Docker
- docker-compose

### Building
- `docker compose up -d` - sets up the containers
- `docker compose down` - turns off the containers

Containers should be available under those links:
- flowerbackend - http://localhost:17524/swagger/index.html
- rabbitmq - http://localhost:17523/
- flower-web-app - http://localhost:17526/
- rabbitmq-producer - http://localhost:17525/message


# How to use this app
## Main app
### Filtering
@a-leandra TODO

### Graphs
@a-leandra TODO

### Saving data
@a-leandra TODO

## Data Generator
Data generator sends mocked data on the queue which allows product testing. It has the following commands taht need to be typed in the browser after running the project.

- `\queue` - shows currently choosen queue which will receive messages you type in.
- `\queue(<queue_name>)` - changes current queue to <queue_name>.
- `\start` - starts one minute simulation of data sending.
- `\start(<minutes>)` - starts simulation of data sending and lasts for <minutes> minutes.
- anything else typed in will be treated as a message and will be sent to currently choosen queue.


# Authors
[Kinga Wladzinska](https://github.com/Popularkiya) |
[Aleksandra Nadzieja](https://github.com/a-leandra)