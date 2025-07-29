// Services/CollegeScorecardService.cs
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

public class CollegeScorecardService : ICollegeScorecardService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public CollegeScorecardService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _apiKey = configuration["CollegeScorecardApiKey"]; // Add this to appsettings.json
    }

    public async Task<string> GetCollegeDataAsync(string collegeName)
    {
        var url = $"https://api.data.gov/ed/collegescorecard/v1/schools" +
                  $"?api_key={_apiKey}&school.name={Uri.EscapeDataString(collegeName)}" +
                  $"&fields=id,school.name,latest.student.size,latest.admissions.admission_rate.overall," +
                  $"latest.cost.avg_net_price.overall,latest.earnings.10_yrs_after_entry.median";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }
}
