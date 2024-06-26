using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MillionaireAPI.Interfaces;
using MillionaireAPI.Models;
using MillionaireAPI.Services;
namespace MillionaireAPI.Controllers
{
    [Route("api/preguntas")]
    [ApiController]
    public class PreguntaController : ControllerBase
    {
        private readonly IPreguntasService _preguntasService;
        public PreguntaController(IPreguntasService preguntasService)
        {
            _preguntasService = preguntasService;
        }
        [HttpGet("obtener-todas")]
        public async Task<ActionResult<List<Pregunta>>> ObtenerTodas()
        {
            try
            {
                var preguntas = await _preguntasService.ObtenerTodasAsync();
                return Ok(preguntas);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al obtener preguntas: {ex.Message}");
            }
        }
        [HttpGet("Obtener-por/{id}")]
        public async Task<ActionResult<Pregunta>> ObtenerPorId(int id)
        {
            try
            {
                var pregunta = await _preguntasService.ObtenerPorIdAsync(id);
                if (pregunta == null)
                {
                    return NotFound();
                }
                return Ok(pregunta);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al obtener pregunta con ID {id}: {ex.Message}");
            }
        }
        [HttpPost("Crear")]
        public async Task<ActionResult> Crear([FromBody] Pregunta pregunta)
        {
            try
            {
                await _preguntasService.CrearAsync(pregunta);
                return CreatedAtAction(nameof(ObtenerPorId), new { id = pregunta.PreguntaID }, pregunta);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al crear pregunta: {ex.Message}");
            }
        }
        [HttpPut("Modificar")]
        public async Task<ActionResult> Actualizar(int id, [FromBody] Pregunta pregunta)
        {
            try
            {
                if (id != pregunta.PreguntaID)
                {
                    return BadRequest("El ID de la pregunta no coincide con el ID de la URL");
                }
                await _preguntasService.ActualizarAsync(pregunta);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al actualizar pregunta con ID {id}: {ex.Message}");
            }
        }
        [HttpDelete("Eliminar/{id}")]
        public async Task<ActionResult> Eliminar(int id)
        {
            try
            {
                await _preguntasService.EliminarAsync(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al eliminar pregunta con ID {id}: {ex.Message}");
            }
        }
        [HttpGet("Obtener-por-dif")]
        public async Task<ActionResult<List<Pregunta>>> ObtenerPorDif(int dif)
        {
            try
            {
                var lista = await _preguntasService.ObtenerPorDifAsync(dif);
                return Ok(lista);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al cargar las preguntas: {ex.Message}");
            }
        }
    }
}
