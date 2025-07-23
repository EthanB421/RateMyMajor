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
    private async Task UpdateMajorRatingAsync(int majorId)
    {
        var reviews = await _unitOfWork.Review.GetReviewsByMajorIdAsync(majorId);
        var major = await _unitOfWork.Major.GetByIdAsync(majorId);
        if (major == null) return;

        major.Rating = reviews.Any() ? reviews.Average(r => r.Rating) : 0;
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

        // Check if major exists
        var major = await _unitOfWork.Major.GetAsync(m => m.Id == dto.MajorId);
        if (major == null)
        {
            return (false, "Major not found.");
        }

        // Create and populate review object
        var review = new Review
        {
            Rating = dto.Rating,
            Content = dto.Content,
            MajorId = dto.MajorId,
            UserId = userId,
            CreatedAt = DateTime.UtcNow
        };

        // Save to DB
        await _unitOfWork.Review.AddAsync(review);
        await _unitOfWork.SaveAsync();

        //Update major rating
        await UpdateMajorRatingAsync(dto.MajorId);

        return (true, "Review added successfully.");
    }
}

