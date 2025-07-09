using RateMyMajor.Models;

public interface IMajorService
{
    Task<Major?> GetMajorByKeywordAsync(string keyword);

}
