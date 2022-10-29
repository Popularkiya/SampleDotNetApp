using Microsoft.Extensions.Hosting;
using RabbitMQ.Client.Events;
using RabbitMQ.Client;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Text;
using System.Threading.Channels;

namespace flowerbackend.RabbitMQ
{
    public class RabbitMQListener : BackgroundService
    {
        private string queueName;
        private ConnectionFactory connectionFactory;
        private IConnection connection = null;
        private IModel channel;

        public RabbitMQListener()
        {
            queueName = "my-queue";
            connectionFactory = new ConnectionFactory
            {
                Uri = new Uri("amqp://guest:guest@rabbitmq")
            };
            connection = connectionFactory.CreateConnection();
            channel = connection.CreateModel();
            channel.QueueDeclare(queueName, true, false, false, null);
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += async (channel, msg) =>
            {
                var message = Encoding.UTF8.GetString(msg.Body.ToArray());
                Console.WriteLine(message);
            };
            channel.BasicConsume(queueName, true, consumer);
            return Task.CompletedTask;
        }
    }
}
