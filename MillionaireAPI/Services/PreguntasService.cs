namespace MillionaireAPI.Services
{
    using Interfaces;
    using DbContext;
    using MillionaireAPI.Models;
    using Microsoft.EntityFrameworkCore;

    public class PreguntasService : IPreguntasService
    {
        private readonly MillionaireDbContext _context;
        public PreguntasService(MillionaireDbContext context)
        {
            _context = context;
        }
        public async Task<List<Pregunta>> ObtenerTodasAsync()
        {
            return await _context.Preguntas.ToListAsync();
        }
        public async Task<Pregunta> ObtenerPorIdAsync(int preguntaId)
        {
            return await _context.Preguntas.FindAsync(preguntaId);
        }
        public async Task CrearAsync(Pregunta pregunta)
        {
            _context.Preguntas.Add(pregunta);
            await _context.SaveChangesAsync();
        }
        public async Task ActualizarAsync(Pregunta pregunta)
        {
            _context.Entry(pregunta).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        public async Task EliminarAsync(int preguntaId)
        {
            var pregunta = await _context.Preguntas.FindAsync(preguntaId);
            if (pregunta != null)
            {
                _context.Preguntas.Remove(pregunta);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<List<Pregunta>> ObtenerPorDifAsync(int dif)
        {
            return await _context.Preguntas
                .Where(o => o.NivelDificultad == dif)
                .ToListAsync();
        }
    }
}
