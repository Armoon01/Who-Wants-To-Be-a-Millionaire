namespace MillionaireAPI.Models
{
    public class Pregunta
    {
        public int PreguntaID { get; set; }
        public string TextoPregunta { get; set; }
        public int NivelDificultad { get; set; }
        public string Categoria { get; set; }
        public ICollection<OpcionRespuesta> OpcionesRespuesta { get; set; }
    }
}
