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
        college.LocationRating = reviews.Any() ? reviews.Average(r => r.Location) : 0;
        college.GymRating = reviews.Any() ? reviews.Average(r => r.Gym) : 0;
        college.ClassroomsRating = reviews.Any() ? reviews.Average(r => r.Classrooms) : 0;
        college.SportsRating = reviews.Any() ? reviews.Average(r => r.Sports) : 0;
        college.FoodRating = reviews.Any() ? reviews.Average(r => r.Food) : 0;
        college.HappinessRating = reviews.Any() ? reviews.Average(r => r.Happiness) : 0;
        college.SafetyRating = reviews.Any() ? reviews.Average(r => r.Safety) : 0;
        college.CommunityRating = reviews.Any() ? reviews.Average(r => r.Community) : 0;
        college.OpportunitiesRating = reviews.Any() ? reviews.Average(r => r.Opportunities) : 0;
        college.FacultyRating = reviews.Any() ? reviews.Average(r => r.Faculty) : 0;
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
            CreatedAt = DateTime.UtcNow,
            Location = dto.Location,
            Gym = dto.Gym,
            Classrooms = dto.Classrooms,
            Sports = dto.Sports,
            Food = dto.Food,
            Happiness = dto.Happiness,
            Safety = dto.Safety,
            Community = dto.Community,
            Opportunities = dto.Opportunities,
            Faculty = dto.Faculty
        };

        // Save to DB
        await _unitOfWork.Review.AddAsync(review);
        await _unitOfWork.SaveAsync();

        //Update college rating
        await UpdateCollegeRatingAsync(dto.CollegeId);

        return (true, "Review added successfully.");
    }
        public async Task<(bool Succeeded, string Message)> DeleteReviewAsync(int reviewId, string userId)
    {
        var review = await _unitOfWork.Review.GetByIdAsync(reviewId);

        if (review == null)
            return (false, "Review not found");

        // Ensure the user deleting the review is the owner
        if (review.UserId != userId)
            return (false, "You are not authorized to delete this review");

        _unitOfWork.Review.Remove(review);
        await _unitOfWork.SaveAsync();

        return (true, "Review deleted successfully");
    }
}

