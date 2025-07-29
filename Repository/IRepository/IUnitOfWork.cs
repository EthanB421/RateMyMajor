

namespace RateMyMajor.Repository.IRepository
{
    public interface IUnitOfWork
    {
        ICollegeRepository College {get;}
        IReviewRepository Review { get; }
        IVoteRepository Vote { get; }
        void Save();
        Task SaveAsync();
    }
}