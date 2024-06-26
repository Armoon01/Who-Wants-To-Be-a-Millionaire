using MillionaireAPI.Models;

namespace MillionaireAPI.Interfaces
{
    public interface IPreguntasService
    {
        Task<List<Pregunta>> ObtenerTodasAsync();
        Task<Pregunta> ObtenerPorIdAsync(int preguntaId);
        Task CrearAsync(Pregunta pregunta);
        Task ActualizarAsync(Pregunta pregunta);
        Task EliminarAsync(int preguntaId);
        Task<List<Pregunta>> ObtenerPorDifAsync(int dif);
    }
}
