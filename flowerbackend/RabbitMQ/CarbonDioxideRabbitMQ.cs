using Microsoft.Extensions.Hosting;
using RabbitMQ.Client.Events;
using RabbitMQ.Client;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Text;
using flowerbackend.Models;
using flowerbackend.Services;

namespace flowerbackend.RabbitMQ
{
    public class CarbonDioxideRabbitMQ : BackgroundService
    {
        private string queueName;
        private ConnectionFactory connectionFactory;
        private IConnection connection = null;
        private IModel channel;

        private readonly CarbonDioxideService carbonDioxideService;

        public CarbonDioxideRabbitMQ(CarbonDioxideService carbonService)
        {
            carbonDioxideService = carbonService;

            queueName = Environment.GetEnvironmentVariable("CO2_QUEUE");
            connectionFactory = new ConnectionFactory
            {
                DispatchConsumersAsync = true,
                Uri = new Uri(Environment.GetEnvironmentVariable("AMQP_URL"))
            };
            connection = connectionFactory.CreateConnection();
            channel = connection.CreateModel();
            channel.QueueDeclare(queueName, true, false, false, null);
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            try
            {
                var consumer = new AsyncEventingBasicConsumer(channel);
                consumer.Received += async (channel, msg) =>
                {
                    var message = Encoding.UTF8.GetString(msg.Body.ToArray());
                    Console.WriteLine("co2:" + message);
                    try
                    {
                        CarbonDioxide temp = Newtonsoft.Json.JsonConvert.DeserializeObject<CarbonDioxide>(message);
                        await carbonDioxideService.CreateAsync(temp);
                    } catch (Exception) {
                        CarbonDioxide myMock = new CarbonDioxide();
                        myMock.Id = "000000000000000000000001";
                        myMock.Value = 2.0;
                        Console.WriteLine("co2:" + message + " was an incorrect json for this class, correct json would be:" + Newtonsoft.Json.JsonConvert.SerializeObject(myMock));
                    }
                };
                channel.BasicConsume(queueName, true, consumer);
            }
            catch (Exception) { }
            return Task.CompletedTask;
        }
    }
}
