using System.Security.Claims;
using RateMyMajor.Models;

public interface IReviewService
{
    Task<(bool Succeeded, string Message)> AddReviewAsync(AddReviewDto dto, ClaimsPrincipal user);
    Task<(bool Succeeded, string Message)> DeleteReviewAsync(int reviewId, string userId);
    Task<IEnumerable<Review>> GetUserReviewsAsync(ClaimsPrincipal user);
}
