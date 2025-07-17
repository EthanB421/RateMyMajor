using RateMyMajor.Models;

public interface IMajorService
{
    Task<Major?> GetMajorByKeywordAsync(string keyword);
    Task<List<MajorDto>> GetAllMajorsAsync();

}
