// Services/ICollegeScorecardService.cs
public interface ICollegeScorecardService
{
    Task<string> GetCollegeDataAsync(string collegeName);
}
