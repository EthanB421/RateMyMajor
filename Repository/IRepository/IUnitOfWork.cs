
namespace RateMyMajor.Repository.IRepository
{
    public interface IUnitOfWork
    {
        IMajorRepository Major {get;}
        IVoteRepository Vote { get; }
        void Save();
    }
}