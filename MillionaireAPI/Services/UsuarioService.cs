namespace MillionaireAPI.Services { 
    using Interfaces;
    using Microsoft.EntityFrameworkCore;
    using MillionaireAPI.DbContext;
    using MillionaireAPI.Models;

    public class UsuarioService : IUsuarioService
    {
        private readonly MillionaireDbContext _context;

        public UsuarioService(MillionaireDbContext context)
        {
            _context = context;
        }
        public async Task<List<Usuario>> ObtenerTodosAsync()
        {
            return await _context.Usuarios.ToListAsync();
        }
        public async Task<Usuario> ObtenerPorIdAsync(int usuarioId)
        {
            return await _context.Usuarios.FindAsync(usuarioId);
        }
        public async Task CrearAsync(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
        }
        public async Task ActualizarAsync(Usuario usuario)
        {
            _context.Entry(usuario).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        public async Task EliminarAsync(int usuarioId)
        {
            var usuario = await _context.Usuarios.FindAsync(usuarioId);
            if (usuario != null)
            {
                _context.Usuarios.Remove(usuario);
                await _context.SaveChangesAsync();
            }
        }
    }
}
