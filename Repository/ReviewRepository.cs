using RateMyMajor.Repository.IRepository;
using RateMyMajor.Data;
using RateMyMajor.Models;
using Microsoft.EntityFrameworkCore;

namespace RateMyMajor.Repository
{
    public class ReviewRepository : Repository<Review>, IReviewRepository
    {
        private readonly ApplicationDbContext _db;

        public ReviewRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(Review obj)
        {
            _db.Review.Update(obj);
        }

        public async Task<Review> GetByIdAsync(int id)
        {
            return await _db.Review.FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<List<Review>> GetAllAsync()
        {
            return await _db.Review.ToListAsync();
        }

        public async Task AddAsync(Review review)
        {
            await _db.Review.AddAsync(review);
        }

        public async Task<List<Review>> GetReviewsByCollegeIdAsync(int collegeId)
        {
            return await _db.Review
                .Where(r => r.CollegeId == collegeId)
                .ToListAsync();
        }
    }
}