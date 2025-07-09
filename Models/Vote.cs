using RateMyMajor.Models;

namespace RateMyMajor.Models;
public class Vote
{
    public int Id { get; set; }

    public string? UserId { get; set; }
    public ApplicationUser User { get; set; }

    public int ReviewId { get; set; }  // FK to Review
    public Review Review { get; set; }

    public int Value { get; set; } // +1 or -1
}
