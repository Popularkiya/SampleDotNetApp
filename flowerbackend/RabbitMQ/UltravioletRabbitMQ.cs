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
    public class UltravioletRabbitMQ : BackgroundService
    {
        private string queueName;
        private ConnectionFactory connectionFactory;
        private IConnection connection = null;
        private IModel channel;

        private readonly UltravioletService ultravioletService;

        public UltravioletRabbitMQ(UltravioletService uvService)
        {
            ultravioletService = uvService;

            queueName = Environment.GetEnvironmentVariable("UV_QUEUE");
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
                    Console.WriteLine("uv:" + message);
                    try
                    {
                        Ultraviolet temp = Newtonsoft.Json.JsonConvert.DeserializeObject<Ultraviolet>(message);
                        await ultravioletService.CreateAsync(temp);
                    }
                    catch (Exception)
                    {
                        Ultraviolet myMock = new Ultraviolet();
                        myMock.Id = "000000000000000000000001";
                        myMock.Value = 2.0;
                        Console.WriteLine("uv:" + message + " was an incorrect json for this class, correct json would be:" + Newtonsoft.Json.JsonConvert.SerializeObject(myMock));
                    }
                };
                channel.BasicConsume(queueName, true, consumer);
            }
            catch (Exception) { }
            return Task.CompletedTask;
        }
    }
}
