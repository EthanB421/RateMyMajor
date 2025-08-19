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
            public double LocationRating { get; set; }

            public double GymRating { get; set; }

            public double ClassroomsRating { get; set; }

            public double SportsRating { get; set; }

            public double FoodRating { get; set; }

            public double HappinessRating { get; set; }

            public double SafetyRating { get; set; }

            public double CommunityRating { get; set; }
            public double OpportunitiesRating { get; set; }
            public double FacultyRating { get; set; }

        [NotMapped]
        public float WouldRecommend { get; set; }
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public string FederalSchoolCode { get; set; }

    }
}