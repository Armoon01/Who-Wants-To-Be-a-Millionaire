namespace MillionaireAPI.Services
{
    using Interfaces;
    using DbContext;
    using Models;
    using Microsoft.EntityFrameworkCore;

    public class PuntuacionService : IPuntuacionService
    {
        private readonly MillionaireDbContext _context;

        public PuntuacionService(MillionaireDbContext context)
        {
            _context = context;
        }
        public async Task<List<Puntuacion>> ObtenerPuntuacionesAsync()
        {
            return await _context.Puntuaciones.ToListAsync();
        }
        public async Task<Puntuacion> ObtenerPuntuacionPorIdAsync(int puntuacionId)
        {
            return await _context.Puntuaciones.FindAsync(puntuacionId);
        }
        public async Task<List<Puntuacion>> ObtenerPuntuacionesPorUsuarioAsync(int UsuarioID)
        {
            return await _context.Puntuaciones.Where(p => p.UsuarioID == UsuarioID).ToListAsync();
        }

        public async Task CrearPuntuacionAsync(Puntuacion puntuacion)
        {
            _context.Puntuaciones.Add(puntuacion);
            await _context.SaveChangesAsync();
        }
        public async Task ActualizarPuntuacionAsync(Puntuacion puntuacion)
        {
            _context.Entry(puntuacion).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        public async Task EliminarPuntuacionAsync(int puntuacionId)
        {
            var puntuacion = await _context.Puntuaciones.FindAsync(puntuacionId);
            if (puntuacion != null)
            {
                _context.Puntuaciones.Remove(puntuacion);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<List<Puntuacion>> ObtenerPuntuacionesOrdenadasDescendenteAsync()
        {
            return await _context.Puntuaciones
                .OrderByDescending(p => p.PuntuacionValor)
                .ToListAsync();
        }
    }
}
