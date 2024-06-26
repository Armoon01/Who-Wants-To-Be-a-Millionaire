namespace MillionaireAPI.Models
{
    public class OpcionRespuesta
    {
        public int OpcionID { get; set; }
        public int PreguntaID { get; set; }
        public string TextoOpcion { get; set; }
        public bool EsCorrecta { get; set; }
    }
}
