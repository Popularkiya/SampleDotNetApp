using flowerbackend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace flowerbackend.Services
{
    public class TemperatureService : IService<Temperature>
    {
        //database context

        public TemperatureService(/*DbContextClass dbContext*/)
        {
            //_dbContext = dbContext;
        }
        public Temperature Add(Temperature entity)
        {
            /*
             * var result = _dbContext.Products.Add(product);
             * _dbContext.SaveChanges();
             * return result.Entity;
             */
            throw new System.NotImplementedException();
        }

        public IEnumerable<Temperature> GetList()
        {
            // return _dbContext.Products.ToList();
            throw new System.NotImplementedException();
        }
    }
}
