using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using RateMyMajor.Models;
using RateMyMajor.Repository.IRepository;

public class CollegeService : ICollegeService
{
    private readonly IUnitOfWork _unitOfWork;

    public CollegeService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }


    public async Task<List<CollegeDto>> GetAllCollegesAsync()
    {
        var colleges = await _unitOfWork.College.GetAllCollegesAsync();

        return colleges.Select(m => new CollegeDto
        {
            Id = m.Id,
            Name = m.Name,
            Description = m.Description,
            CollegeRating = m.Rating,
            GymRating = m.GymRating,
            ClassroomsRating = m.ClassroomsRating,
            SportsRating = m.SportsRating,
            FoodRating = m.FoodRating,
            HappinessRating = m.HappinessRating,
            SafetyRating = m.SafetyRating,
            CommunityRating = m.CommunityRating,
            OpportunitiesRating = m.OpportunitiesRating,
            FacultyRating = m.FacultyRating,
            LocationRating = m.LocationRating
        }).ToList();
    }

    public async Task<College?> GetCollegeByKeywordAsync(string keyword)
    {
        if (string.IsNullOrWhiteSpace(keyword))
            return null;

        keyword = keyword.Trim().ToLower();

        var college = await _unitOfWork.College.GetAsync(
            m => m.Name.ToLower().Contains(keyword),
            includeProperties: "Reviews"
        );

        if (college == null)
            return null;

        college.Reviews = college.Reviews.OrderByDescending(r => r.CreatedAt).ToList();
        var reviewIds = college.Reviews.Select(r => r.Id).ToList();

        var voteSums = await _unitOfWork.Vote.GetVoteSumByReviewAsync(reviewIds);

        foreach (var review in college.Reviews)
        {
            var voteSum = voteSums.FirstOrDefault(v => v.ReviewId == review.Id);
            review.VoteScore = voteSum?.VoteSum ?? 0;
        }

        int totalReviews = college.Reviews.Count;
        int recommendedCount = college.Reviews.Count(r => r.Rating >= 3);

        college.WouldRecommend = totalReviews > 0
            ? (int)Math.Round((double)recommendedCount / totalReviews * 100)
            : 0;
        await UpdateCollegeRatingAsync(college.Id);

        return college;
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

}
