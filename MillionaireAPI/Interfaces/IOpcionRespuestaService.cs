using MillionaireAPI.Models;

namespace MillionaireAPI.Interfaces
{
    public interface IOpcionRespuestaService
    {
        Task<List<OpcionRespuesta>> ObtenerTodasAsync();
        Task<OpcionRespuesta> ObtenerPorIdAsync(int opcionRespuestaId);
        Task CrearAsync(OpcionRespuesta opcionRespuesta);
        Task ActualizarAsync(OpcionRespuesta opcionRespuesta);
        Task EliminarAsync(int opcionRespuestaId);
        Task<List<OpcionRespuesta>> ObtenerPorIdPreguntaAsync(int preguntaId);
    }
}
