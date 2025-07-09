
using RateMyMajor.Models;

namespace RateMyMajor.Repository.IRepository
{
    public interface IVoteRepository : IRepository<Vote>
    {
        Task<List<VoteSumDto>> GetVoteSumByReviewAsync(List<int> reviewIds);
    }
}