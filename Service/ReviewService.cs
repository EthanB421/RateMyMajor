using System.Security.Claims;
using RateMyMajor.Models;
using RateMyMajor.Repository.IRepository;

public class ReviewService : IReviewService
{
    private readonly IUnitOfWork _unitOfWork;

    public ReviewService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }
    private async Task UpdateCollegeRatingAsync(int collegeId)
    {
        var reviews = await _unitOfWork.Review.GetReviewsByCollegeIdAsync(collegeId);
        var college = await _unitOfWork.College.GetByIdAsync(collegeId);
        if (college == null) return;

        college.Rating = reviews.Any() ? reviews.Average(r => r.Rating) : 0;
        await _unitOfWork.SaveAsync();
    }


    public async Task<(bool Succeeded, string Message)> AddReviewAsync(AddReviewDto dto, ClaimsPrincipal user)
    {
        var claims = user?.Claims.Select(c => new { c.Type, c.Value }).ToList();
        if (claims == null || !claims.Any())
        {
            return (false, "No user claims found. User is probably not authenticated.");
        }
        if (dto.Rating < 1 || dto.Rating > 5)
        {
            return (false, "Rating must be between 1 and 5.");
        }


        // Get user ID from the authenticated user
        var userId = user?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
        {
            return (false, "gg.");
        }

        // Check if college exists
        var college = await _unitOfWork.College.GetAsync(m => m.Id == dto.CollegeId);
        if (college == null)
        {
            return (false, "College not found.");
        }

        // Create and populate review object
        var review = new Review
        {
            Rating = dto.Rating,
            Content = dto.Content,
            CollegeId = dto.CollegeId,
            UserId = userId,
            CreatedAt = DateTime.UtcNow
        };

        // Save to DB
        await _unitOfWork.Review.AddAsync(review);
        await _unitOfWork.SaveAsync();

        //Update college rating
        await UpdateCollegeRatingAsync(dto.CollegeId);

        return (true, "Review added successfully.");
    }
}

