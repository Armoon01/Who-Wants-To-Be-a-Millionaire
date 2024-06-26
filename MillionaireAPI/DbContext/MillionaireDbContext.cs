namespace MillionaireAPI.DbContext
{
    using Microsoft.EntityFrameworkCore;
    using MillionaireAPI.Models;

    public class MillionaireDbContext : DbContext
    {
        public MillionaireDbContext(DbContextOptions<MillionaireDbContext> options)
            : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Pregunta> Preguntas { get; set; }
        public DbSet<OpcionRespuesta> OpcionesRespuesta { get; set; }
        public DbSet<Puntuacion> Puntuaciones { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuración de claves primarias
            modelBuilder.Entity<Usuario>()
                .HasKey(u => u.UsuarioID);

            modelBuilder.Entity<Pregunta>()
                .HasKey(p => p.PreguntaID);

            modelBuilder.Entity<OpcionRespuesta>()
                .HasKey(or => or.OpcionID);

            modelBuilder.Entity<Puntuacion>()
                .HasKey(p => p.PuntuacionID);

            // Relación entre Pregunta y OpcionRespuesta
            modelBuilder.Entity<OpcionRespuesta>()
                .HasOne<Pregunta>()
                .WithMany(p => p.OpcionesRespuesta)
                .HasForeignKey(o => o.PreguntaID)
                .OnDelete(DeleteBehavior.Cascade);

            // Relación entre Usuario y Puntuacion
            modelBuilder.Entity<Puntuacion>()
                .HasOne<Usuario>()
                .WithMany(u => u.Puntuaciones)
                .HasForeignKey(p => p.UsuarioID)
                .OnDelete(DeleteBehavior.Cascade);

            // Configuración adicional de índices únicos
            modelBuilder.Entity<Usuario>()
                .HasIndex(u => u.Correo)
                .IsUnique();

            // Configuración de índices para mejorar la eficiencia de las consultas
            modelBuilder.Entity<Pregunta>()
                .HasIndex(p => p.NivelDificultad);

            modelBuilder.Entity<OpcionRespuesta>()
                .HasIndex(o => o.PreguntaID);

            modelBuilder.Entity<Puntuacion>()
                .HasIndex(p => p.UsuarioID);

            base.OnModelCreating(modelBuilder);
        }
    }
}