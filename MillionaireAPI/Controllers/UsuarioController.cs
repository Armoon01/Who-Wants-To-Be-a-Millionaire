
using Microsoft.AspNetCore.Mvc;
using MillionaireAPI.Interfaces;
using MillionaireAPI.Models;

namespace MillionaireAPI.Controllers
{
    [Route("api/usuario")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpGet("Obtener-todos")]
        public async Task<ActionResult<List<Usuario>>> ObtenerTodos()
        {
            try
            {
                var usuarios = await _usuarioService.ObtenerTodosAsync();
                return Ok(usuarios);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al obtener usuarios: {ex.Message}");
            }
        }

        [HttpGet("Obtener/{id}")]
        public async Task<ActionResult<Usuario>> ObtenerPorId(int id)
        {
            try
            {
                var usuario = await _usuarioService.ObtenerPorIdAsync(id);
                if (usuario == null)
                {
                    return NotFound();
                }
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al obtener usuario con ID {id}: {ex.Message}");
            }
        }

        [HttpPost("Crear")]
        public async Task<ActionResult> Crear([FromBody] Usuario usuario)
        {
            try
            {
                await _usuarioService.CrearAsync(usuario);
                return CreatedAtAction(nameof(ObtenerPorId), new { id = usuario.UsuarioID }, usuario);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al crear usuario: {ex.Message}");
            }
        }

        [HttpPut("Modificar/{id}")]
        public async Task<ActionResult> Actualizar(int id, [FromBody] Usuario usuario)
        {
            try
            {
                if (id != usuario.UsuarioID)
                {
                    return BadRequest("IDs de usuario no coinciden");
                }

                await _usuarioService.ActualizarAsync(usuario);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al actualizar usuario con ID {id}: {ex.Message}");
            }
        }

        [HttpDelete("Eliminar/{id}")]
        public async Task<ActionResult> Eliminar(int id)
        {
            try
            {
                await _usuarioService.EliminarAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error al eliminar usuario con ID {id}: {ex.Message}");
            }
        }
    }
}
