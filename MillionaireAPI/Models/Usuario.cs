namespace MillionaireAPI.Models
{
    using System.ComponentModel.DataAnnotations;
    public class Usuario
    {
        public int UsuarioID { get; set; }

        [Required]
        public string NombreUsuario { get; set; }

        [Required]
        [EmailAddress]
        public string Correo { get; set; }

        [Required]
        public string Contrasena { get; set; }
        public ICollection<Puntuacion> Puntuaciones { get; set; }
    }
}
