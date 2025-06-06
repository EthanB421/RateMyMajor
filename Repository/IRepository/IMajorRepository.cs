using RateMyMajor.Models;

namespace RateMyMajor.Repository.IRepository
{
    public interface IMajorRepository : IRepository<Major>
    {
        void Update(Major obj);
    }
}