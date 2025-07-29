using RateMyMajor.Repository.IRepository;
using RateMyMajor.Data;
using RateMyMajor.Models;
using Microsoft.EntityFrameworkCore;

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

        public async Task AddAsync(Review review)
        {
            await _db.Review.AddAsync(review);
        }
            
        public async Task<List<Review>> GetReviewsByCollegeIdAsync(int majorId)
        {
            return await _db.Review
                .Where(r => r.CollegeId == majorId)
                .ToListAsync();
        }

        
    }
}