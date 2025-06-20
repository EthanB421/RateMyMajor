using RateMyMajor.Models;
using RateMyMajor.Repository.IRepository;

public class MajorService : IMajorService
{
    private readonly IUnitOfWork _unitOfWork;

    public MajorService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Major?> GetMajorByKeywordAsync(string keyword)
    {
        if (string.IsNullOrWhiteSpace(keyword))
            return null;

        keyword = keyword.Trim().ToLower();

        return await _unitOfWork.Major.GetAsync(
            m => m.Name.ToLower().Contains(keyword)
        );
    }

}
