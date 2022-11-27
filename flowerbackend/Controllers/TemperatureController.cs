using flowerbackend.Models;
using flowerbackend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace flowerbackend.Controllers
{
    [Route("api/temperature")]
    [ApiController]
    public class TemperatureController : ControllerBase
    {
        private readonly TemperatureService temperatureService;

        public TemperatureController(TemperatureService tempService)
        {
            temperatureService = tempService;
        }

        [HttpGet]
        public async Task<List<Temperature>> Get() => await temperatureService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Temperature>> Get(string id)
        {
            var temp = await temperatureService.GetAsync(id);

            if (temp is null)
            {
                return NotFound();
            }

            return temp;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Temperature newTemp)
        {
            await temperatureService.CreateAsync(newTemp);
            return CreatedAtAction(nameof(Get), new { id = newTemp.Id }, newTemp);
        }
    }
}
