using System.ComponentModel.DataAnnotations;

namespace RateMyMajor.Models
{
public class User
    {
        [Key]
        public int Id { get;set; }
        public required string FirstName { get;set; }
        public required string LasttName { get;set; }
        public string email { get;set; }
        private string password{ get;set; }
    }
}