using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace RateMyMajor.Models
{

    public class Review
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Content { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }
        [Range(1, 5)]
        public int Location { get; set; }

        [Range(1, 5)]
        public int Gym { get; set; }

        [Range(1, 5)]
        public int Classrooms { get; set; }

        [Range(1, 5)]
        public int Sports { get; set; }

        [Range(1, 5)]
        public int Food { get; set; }

        [Range(1, 5)]
        public int Happiness { get; set; }

        [Range(1, 5)]
        public int Safety { get; set; }

        [Range(1, 5)]
        public int Community { get; set; }
        [Range(1, 5)]
        public int Opportunities { get; set; }
        [Range(1, 5)]
        public int Faculty { get; set; }


        [DisplayName("College")]
        public int CollegeId { get; set; }

        [ForeignKey("CollegeId")]
        [ValidateNever]
        [JsonIgnore]
        public College College { get; set; }

        [DisplayName("User")]
        [ForeignKey("UserId")]
        public string UserId { get; set; }        // <- This is the Id from IdentityUser

        public ApplicationUser User { get; set; } // Navigation property        [NotMapped]
        public int VoteScore { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}