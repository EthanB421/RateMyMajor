using System.ComponentModel.DataAnnotations;

namespace RateMyMajor.Models
{
    public class Major
    {
        [Key]
        public int Id { get; set; }
        public required string Name { get; set; }
        public string Description { get; set; }
        public int Rating { get; set; }
        public ICollection<Review> Reviews { get; set; } = new List<Review>();

    }
}