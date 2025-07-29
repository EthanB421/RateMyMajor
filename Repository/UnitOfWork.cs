using RateMyMajor.Repository.IRepository;
using RateMyMajor.Data;

namespace RateMyMajor.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private ApplicationDbContext _db;
        public ICollegeRepository College{get;private set;}
        public IReviewRepository Review{get;private set;}
        public IVoteRepository Vote { get; private set; }


        public UnitOfWork(ApplicationDbContext db)
        {
            _db = db;
            College = new CollegeRepository(_db);
            Review = new ReviewRepository(_db);
            Vote = new VoteRepository(_db);
        }

        public async Task SaveAsync()
        {
            await _db.SaveChangesAsync();
        }

        public void Save()
        {
            _db.SaveChanges();
        }
    }
}