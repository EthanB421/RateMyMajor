using RateMyMajor.Repository.IRepository;
using RateMyMajor.Data;
using RateMyMajor.Models;
using Microsoft.EntityFrameworkCore;

namespace RateMyMajor.Repository
{
    public class CollegeRepository : Repository<College>, ICollegeRepository
    {
        private ApplicationDbContext _db;
        public CollegeRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(College obj)
        {
            _db.College.Update(obj);
        }

        public async Task<List<College>> GetAllCollegesAsync()
        {
            return await _db.College.ToListAsync();
        }

        public async Task<College> GetByIdAsync(int collegeId)
        {
            return await _db.College.FindAsync(collegeId);
        }

    }
}