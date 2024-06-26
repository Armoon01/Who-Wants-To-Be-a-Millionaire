namespace MillionaireAPI.Services
{
    using Interfaces;
    using DbContext;
    using Models;
    using Microsoft.EntityFrameworkCore;

    public class OpcionRespuestaService : IOpcionRespuestaService
    {
        private readonly MillionaireDbContext _context;
        public OpcionRespuestaService(MillionaireDbContext context)
        {   
            _context = context;
        }
        public async Task<List<OpcionRespuesta>> ObtenerTodasAsync()
        {
            return await _context.OpcionesRespuesta.ToListAsync();
        }
        public async Task<OpcionRespuesta> ObtenerPorIdAsync(int opcionRespuestaId)
        {
            return await _context.OpcionesRespuesta.FindAsync(opcionRespuestaId);
        }
        public async Task CrearAsync(OpcionRespuesta opcionRespuesta)
        {
            _context.OpcionesRespuesta.Add(opcionRespuesta);
            await _context.SaveChangesAsync();
        }
        public async Task ActualizarAsync(OpcionRespuesta opcionRespuesta)
        {
            _context.Entry(opcionRespuesta).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        public async Task EliminarAsync(int opcionRespuestaId)
        {
            var opcionRespuesta = await _context.OpcionesRespuesta.FindAsync(opcionRespuestaId);
            if (opcionRespuesta != null)
            {
                _context.OpcionesRespuesta.Remove(opcionRespuesta);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<List<OpcionRespuesta>> ObtenerPorIdPreguntaAsync(int preguntaId)
        {
            return await _context.OpcionesRespuesta
                .Where(o => o.PreguntaID == preguntaId)
                .ToListAsync();
        }
    }
}
