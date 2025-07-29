using RateMyMajor.Models;

namespace RateMyMajor.Repository.IRepository
{
    public interface ICollegeRepository : IRepository<College>
    {
        void Update(College obj);
        Task<List<College>> GetAllCollegesAsync();
        Task<College> GetByIdAsync(int collegeId);

    }
}