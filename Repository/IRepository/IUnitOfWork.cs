

namespace RateMyMajor.Repository.IRepository
{
    public interface IUnitOfWork
    {
        IMajorRepository Major {get;}
        IReviewRepository Review { get; }
        IVoteRepository Vote { get; }
        void Save();
        Task SaveAsync();
    }
}