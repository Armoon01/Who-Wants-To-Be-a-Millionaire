using Microsoft.AspNetCore.Mvc;
using MillionaireAPI.Interfaces;
using MillionaireAPI.Models;

namespace MillionaireAPI.Controllers
{
    [Route("api/opcionRespuesta")]
    [ApiController]
    public class OpcionRespuestaController : ControllerBase
    {
        private readonly IOpcionRespuestaService _opcionRespuestaService;
        public OpcionRespuestaController(IOpcionRespuestaService opcionRespuestaService)
        {
            _opcionRespuestaService = opcionRespuestaService;
        }
        [HttpGet("obtener-todos")]
        public async Task<ActionResult<List<OpcionRespuesta>>> ObtenerTodas()
        {
            try
            {
                var opcionesRespuesta = await _opcionRespuestaService.ObtenerTodasAsync();
                return Ok(opcionesRespuesta);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al obtener opciones de respuesta: {ex.Message}");
            }
        }
        [HttpGet("Obtener-por/{id}")]
        public async Task<ActionResult<OpcionRespuesta>> ObtenerPorId(int id)
        {
            try
            {
                var opcionRespuesta = await _opcionRespuestaService.ObtenerPorIdAsync(id);
                if (opcionRespuesta == null)
                {
                    return NotFound();
                }
                return Ok(opcionRespuesta);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al obtener opcion de respuesta con ID {id}: {ex.Message}");
            }
        }
        [HttpPost("Crear")]
        public async Task<ActionResult> Crear([FromBody] OpcionRespuesta opcionRespuesta)
        {
            try
            {
                await _opcionRespuestaService.CrearAsync(opcionRespuesta);
                return CreatedAtAction(nameof(ObtenerPorId), new { id = opcionRespuesta.OpcionID }, opcionRespuesta);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al crear opcion de respuesta: {ex.Message}");
            }
        }
        [HttpPut("Modificar/{id}")]
        public async Task<ActionResult> Actualizar(int id, [FromBody] OpcionRespuesta opcionRespuesta)
        {
            try
            {
                await _opcionRespuestaService.ActualizarAsync(opcionRespuesta);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al actualizar opcion de respuesta con ID {id}: {ex.Message}");
            }
        }
        [HttpDelete("Eliminar/{id}")]
        public async Task<ActionResult> Eliminar(int id)
        {
            try
            {
                await _opcionRespuestaService.EliminarAsync(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al eliminar opcion de respuesta con ID {id}: {ex.Message}");
            }
        }
        [HttpGet("Obtener-todas-por/{preguntaId}")]
        public async Task<ActionResult<List<OpcionRespuesta>>> ObtenerPorPregunta(int preguntaId)
        {
            var opcionesRespuesta = await _opcionRespuestaService.ObtenerPorIdPreguntaAsync(preguntaId);
            return Ok(opcionesRespuesta);
        }
    }
}
