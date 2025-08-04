using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RateMyMajor.Models
{
    public class College
    {
        [Key]
        public int Id { get; set; }
        public required string Name { get; set; }
        public string Description { get; set; }
        public double Rating { get; set; }

        [NotMapped]
        public float WouldRecommend { get; set; }
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public string FederalSchoolCode { get; set; }

    }
}