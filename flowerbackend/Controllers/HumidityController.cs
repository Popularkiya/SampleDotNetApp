using flowerbackend.Models;
using flowerbackend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace flowerbackend.Controllers
{
    [Route("api/humidity")]
    [ApiController]
    public class HumidityController : ControllerBase
    {
        private readonly HumidityService humidityService;

        public HumidityController(HumidityService humService)
        {
            humidityService = humService;
        }

        [HttpGet]
        public async Task<List<Humidity>> Get() => await humidityService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Humidity>> Get(string id)
        {
            var temp = await humidityService.GetAsync(id);

            if (temp is null)
            {
                return NotFound();
            }

            return temp;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Humidity newTemp)
        {
            await humidityService.CreateAsync(newTemp);
            return CreatedAtAction(nameof(Get), new { id = newTemp.Id }, newTemp);
        }
    }
}
