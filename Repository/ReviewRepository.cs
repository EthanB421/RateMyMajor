using RateMyMajor.Repository.IRepository;
using RateMyMajor.Data;
using RateMyMajor.Models;

namespace RateMyMajor.Repository
{
    public class ReviewRepository : Repository<Review>, IReviewRepository
    {
        private ApplicationDbContext _db;
        public ReviewRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(Review obj)
        {
            _db.Review.Update(obj);
        }
    }
}