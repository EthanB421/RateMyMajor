using RateMyMajor.Repository.IRepository;
using RateMyMajor.Data;
using RateMyMajor.Models;
using Microsoft.EntityFrameworkCore;

namespace RateMyMajor.Repository
{
    public class VoteRepository : Repository<Vote>, IVoteRepository
    {
        private ApplicationDbContext _db;
        public VoteRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }

        public async Task<List<VoteSumDto>> GetVoteSumByReviewAsync(List<int> reviewIds)
        {
            return await _db.Votes
                .Where(v => reviewIds.Contains(v.ReviewId))
                .GroupBy(v => v.ReviewId)
                .Select(g => new VoteSumDto
                {
                    ReviewId = g.Key,
                    VoteSum = g.Sum(v => v.Value)
                })
                .ToListAsync();
        }

    }
}