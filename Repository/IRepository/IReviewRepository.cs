using RateMyMajor.Models;

namespace RateMyMajor.Repository.IRepository
{
    public interface IReviewRepository : IRepository<Review>
    {
        void Update(Review obj);
        Task AddAsync(Review review);
        Task<List<Review>> GetReviewsByMajorIdAsync(int majorId);

    }
}