using flowerbackend.Data;
using flowerbackend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace flowerbackend.Services
{
    public class HumidityService
    {
        //database context
        private readonly IMongoCollection<Humidity> collection;

        public HumidityService(IOptions<DatabaseSettings> dbSettings)
        {
            var mongoClient = new MongoClient(dbSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(dbSettings.Value.DatabaseName);
            collection = mongoDatabase.GetCollection<Humidity>(dbSettings.Value.HumidityCollectionName);
        }

        public async Task<List<Humidity>> GetAsync() => await collection.Find(_ => true).ToListAsync();

        public async Task<Humidity?> GetAsync(string id) => await collection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Humidity newBook)
        {
            newBook.Timestamp = DateTime.Now.ToString("MM/dd/yy H:mm:ss");
            if (newBook.Value >= 60.0) { newBook.Status = Constants.HIGH; }
            else if (newBook.Value <= 45.0) { newBook.Status = Constants.LOW; }
            else { newBook.Status = Constants.OK; }
            await collection.InsertOneAsync(newBook);
        }
    }
}
