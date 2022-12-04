using flowerbackend.Models;
using flowerbackend.RabbitMQ;
using flowerbackend.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flowerbackend
{
    public class Startup
    {
        public string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  policy =>
                                  {
                                      policy.WithOrigins("http://localhost:17526");
                                  });
            });

            services.Configure<DatabaseSettings>(Configuration.GetSection("SI_175237"));

            services.AddHostedService<RabbitMQListener>();
            services.AddHostedService<CarbonDioxideRabbitMQ>();
            services.AddHostedService<TemperatureRabbitMQ>();
            services.AddHostedService<HumidityRabbitMQ>();
            services.AddHostedService<UltravioletRabbitMQ>();

            services.AddSingleton<CarbonDioxideService>();
            services.AddSingleton<TemperatureService>();
            services.AddSingleton<HumidityService>();
            services.AddSingleton<UltravioletService>();

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "flowerbackend", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "flowerbackend v1"));

            app.UseRouting();
            app.UseCors(MyAllowSpecificOrigins);
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
