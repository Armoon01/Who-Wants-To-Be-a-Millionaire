using MillionaireAPI.Models;

namespace MillionaireAPI.Interfaces
{
    public interface IUsuarioService
    {
        Task<List<Usuario>> ObtenerTodosAsync();
        Task<Usuario> ObtenerPorIdAsync(int usuarioId);
        Task CrearAsync(Usuario usuario);
        Task ActualizarAsync(Usuario usuario);
        Task EliminarAsync(int usuarioId);
    }
}
