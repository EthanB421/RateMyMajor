using RateMyMajor.Repository.IRepository;
using RateMyMajor.Data;
using RateMyMajor.Models;

namespace RateMyMajor.Repository
{
    public class MajorRepository : Repository<Major>, IMajorRepository
    {
        private ApplicationDbContext _db;
        public MajorRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public void Update(Major obj)
        {
            _db.Major.Update(obj);
        }
    }
}