namespace mdp.DTO
{
    public class OperacaoDTO
    {
        public string Descricao { get; set; }
        public long Duracao { get; set; }
        public string Id { get; set; }

        public override string ToString()
        {
            return Id + " : " + Descricao + " : " + Duracao;
        }
    }
}