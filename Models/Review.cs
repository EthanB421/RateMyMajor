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