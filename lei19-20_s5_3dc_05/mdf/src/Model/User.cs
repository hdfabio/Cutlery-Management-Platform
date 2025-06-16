namespace mdf.Model
{
    public class User1
    {
        public string token { get; set; }

        public User user;
    }

    public class User
    {
        public string email { get; set; }
        public string password { get; set; }
        public string type { get; set; }
        public string _id { get; set; }
    }
}