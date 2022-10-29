using flowerbackend.Models;
using flowerbackend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace flowerbackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemperatureController : ControllerBase
    {
        private readonly TemperatureService temperatureService;

        public TemperatureController(TemperatureService tempService)
        {
            temperatureService = tempService;
        }

        [HttpGet("list")]
        public IEnumerable<Temperature> ProductList()
        {
            var list = temperatureService.GetList();
            return list;
        }
    }
}
