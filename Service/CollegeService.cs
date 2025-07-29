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
            CollegeRating = m.Rating
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

        return college;
    }

}
