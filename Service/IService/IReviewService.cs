using System.Security.Claims;
using RateMyMajor.Models;

public interface IReviewService
{
Task<(bool Succeeded, string Message)> AddReviewAsync(AddReviewDto dto, ClaimsPrincipal user);


}
