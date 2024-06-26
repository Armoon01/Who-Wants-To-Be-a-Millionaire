using MillionaireAPI.Models;

namespace MillionaireAPI.Interfaces
{
    public interface IPuntuacionService
    {
        Task<List<Puntuacion>> ObtenerPuntuacionesAsync();
        Task<Puntuacion> ObtenerPuntuacionPorIdAsync(int puntuacionId);
        Task<List<Puntuacion>> ObtenerPuntuacionesPorUsuarioAsync(int usuarioId);
        Task CrearPuntuacionAsync(Puntuacion puntuacion);
        Task ActualizarPuntuacionAsync(Puntuacion puntuacion);
        Task EliminarPuntuacionAsync(int puntuacionId);
        Task<List<Puntuacion>> ObtenerPuntuacionesOrdenadasDescendenteAsync();
    }
}
