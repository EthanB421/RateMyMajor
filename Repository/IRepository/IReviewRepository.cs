using RateMyMajor.Models;

namespace RateMyMajor.Repository.IRepository
{
    public interface IReviewRepository : IRepository<Review>
    {
        void Update(Review obj);
    }
}