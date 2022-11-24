using Microsoft.Extensions.Hosting;
using RabbitMQ.Client.Events;
using RabbitMQ.Client;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Text;

namespace flowerbackend.RabbitMQ
{
    public class CarbonDioxideRabbitMQ : BackgroundService
    {
        private string queueName;
        private ConnectionFactory connectionFactory;
        private IConnection connection = null;
        private IModel channel;

        public CarbonDioxideRabbitMQ()
        {
            queueName = Environment.GetEnvironmentVariable("CO2_QUEUE");
            connectionFactory = new ConnectionFactory
            {
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
                var consumer = new EventingBasicConsumer(channel);
                consumer.Received += (channel, msg) =>
                {
                    var message = Encoding.UTF8.GetString(msg.Body.ToArray());
                    Console.WriteLine("co2:" + message);
                };
                channel.BasicConsume(queueName, true, consumer);
            }
            catch (Exception) { }
            return Task.CompletedTask;
        }
    }
}
