using RateMyMajor.Models;

public interface ICollegeService
{
    Task<College?> GetCollegeByKeywordAsync(string keyword);
    Task<List<CollegeDto>> GetAllCollegesAsync();

}
