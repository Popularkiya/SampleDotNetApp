using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace flowerbackend
{
    public class Program
    {
        class MyConsumer : DefaultBasicConsumer
        {
            public MyConsumer(IModel model) : base(model) { }
            public override void HandleBasicDeliver(string consumerTag, ulong deliveryTag, bool
           redelivered, string exchange, string routingKey, IBasicProperties properties,
           ReadOnlyMemory<byte> body)
            {
                var message = Encoding.UTF8.GetString(body.ToArray());
                Console.WriteLine(message);
                // show message
            }
        }

        public static void Main(string[] args)
        {
            var queueName = "my-queue";

            var factory = new ConnectionFactory()
            {
                HostName = "localhost",
            };
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare("my-queue", true, false, false, null);
                var consumer = new MyConsumer(channel);
                channel.BasicConsume("my-queue", true, consumer);
                Console.ReadKey();
            }

            Console.WriteLine(" Press any key to exit.");
            Console.ReadKey();

            //CreateHostBuilder(args).Build().Run();
        }
        /*
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });*/
    }
}
