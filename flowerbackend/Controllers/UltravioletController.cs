using flowerbackend.Models;
using flowerbackend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace flowerbackend.Controllers
{
    [Route("api/ultraviolet")]
    [ApiController]
    public class UltravioletController : ControllerBase
    {
        private readonly UltravioletService ultravioletService;

        public UltravioletController(UltravioletService uvService)
        {
            ultravioletService = uvService;
        }

        [HttpGet]
        public async Task<List<Ultraviolet>> Get() => await ultravioletService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Ultraviolet>> Get(string id)
        {
            var temp = await ultravioletService.GetAsync(id);

            if (temp is null)
            {
                return NotFound();
            }

            return temp;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Ultraviolet newTemp)
        {
            await ultravioletService.CreateAsync(newTemp);
            return CreatedAtAction(nameof(Get), new { id = newTemp.Id }, newTemp);
        }
    }
}
