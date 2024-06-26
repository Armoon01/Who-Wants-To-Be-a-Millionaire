using Microsoft.AspNetCore.Mvc;
using MillionaireAPI.Interfaces;
using MillionaireAPI.Models;
namespace MillionaireAPI.Controllers
{
    [Route("api/puntuacion")]
    [ApiController]
    public class PuntuacionController : ControllerBase
    {
        private readonly IPuntuacionService _puntuacionService;
        public PuntuacionController(IPuntuacionService puntuacionService)
        {
            _puntuacionService = puntuacionService;
        }
        [HttpGet("Obtener-todas")]
        public async Task<ActionResult<List<Puntuacion>>> ObtenerTodas()
        {
            try
            {
                var puntuaciones = await _puntuacionService.ObtenerPuntuacionesAsync();
                return Ok(puntuaciones);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al obtener puntuaciones: {ex.Message}");
            }
        }
        [HttpGet("Obtener-por")]
        public async Task<ActionResult<Puntuacion>> ObtenerPorId(int id)
        {
            try
            {
                var puntuacion = await _puntuacionService.ObtenerPuntuacionPorIdAsync(id);
                if (puntuacion == null)
                {
                    return NotFound();
                }
                return Ok(puntuacion);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al obtener puntuacion con ID {id}: {ex.Message}");
            }
        }
        [HttpPost("Crear")]
        public async Task<ActionResult> Crear([FromBody] Puntuacion puntuacion)
        {
            try
            {
                await _puntuacionService.CrearPuntuacionAsync(puntuacion);
                return CreatedAtAction(nameof(ObtenerPorId), new { id = puntuacion.PuntuacionID }, puntuacion);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al crear puntuacion: {ex.Message}");
            }
        }
        [HttpPut("Modificar/{id}")]
        public async Task<ActionResult> Actualizar(int id, [FromBody] Puntuacion puntuacion)
        {
            try
            {
                if (id != puntuacion.PuntuacionID)
                {
                    return BadRequest("El ID de la puntuacion no coincide con el ID de la URL");
                }
                await _puntuacionService.ActualizarPuntuacionAsync(puntuacion);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al actualizar puntuacion: {ex.Message}");
            }
        }
        [HttpDelete("Eliminar/{id}")]
        public async Task<ActionResult> Eliminar(int id)
        {
            try
            {
                await _puntuacionService.EliminarPuntuacionAsync(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al eliminar puntuacion: {ex.Message}");
            }
        }
        [HttpGet("Obtener-mejores-puntuaciones")]
        public async Task<ActionResult<List<Puntuacion>>> ObtenerMejoresPuntuaciones()
        {
            try
            {
                var mejoresPuntuaciones = await _puntuacionService.ObtenerPuntuacionesOrdenadasDescendenteAsync();
                return Ok(mejoresPuntuaciones);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al cargar las puntuaciones: {ex.Message}");
            }
        }
    }
}
