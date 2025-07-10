using RateMyMajor.Models;
using RateMyMajor.Repository.IRepository;

public class MajorService : IMajorService
{
    private readonly IUnitOfWork _unitOfWork;

    public MajorService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Major?> GetMajorByKeywordAsync(string keyword)
    {
        if (string.IsNullOrWhiteSpace(keyword))
            return null;

        keyword = keyword.Trim().ToLower();

        var major = await _unitOfWork.Major.GetAsync(
            m => m.Name.ToLower().Contains(keyword),
            includeProperties: "Reviews"
        );

        if (major == null)
            return null;

        var reviewIds = major.Reviews.Select(r => r.Id).ToList();

        var voteSums = await _unitOfWork.Vote.GetVoteSumByReviewAsync(reviewIds);

        foreach (var review in major.Reviews)
        {
            var voteSum = voteSums.FirstOrDefault(v => v.ReviewId == review.Id);
            review.VoteScore = voteSum?.VoteSum ?? 0;
        }

            int totalReviews = major.Reviews.Count;
            int recommendedCount = major.Reviews.Count(r => r.Rating >= 3);

            major.WouldRecommend = totalReviews > 0
                ? (int)Math.Round((double)recommendedCount / totalReviews * 100)
                : 0;

        return major;
    }

}
