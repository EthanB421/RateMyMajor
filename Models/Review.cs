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

        [DisplayName("Major")]
        public int MajorId { get; set; }

        [ForeignKey("MajorId")]
        [ValidateNever]
        [JsonIgnore]
        public Major Major { get; set; }
    }
}