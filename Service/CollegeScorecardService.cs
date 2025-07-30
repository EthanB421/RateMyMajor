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
        var encodedName = Uri.EscapeDataString(collegeName);

        var fields = string.Join(',',
            "school.name",
            "latest.cost.avg_net_price.public",
            "latest.cost.avg_net_price.private",
            "latest.earnings.1_yr_after_completion.median",
            "latest.earnings.4_yrs_after_completion.median",
            "latest.earnings.5_yrs_after_completion.median",
            "latest.earnings.cip_4_digit.4_yr.male_median_earnings",
            "latest.completion.completion_rate_4yr_150nt",
            "latest.repayment.1_yr_bb_fed_repayment.grcomp.fully_paid",
            "latest.demographics.race_ethnicity.black",
            "latest.demographics.race_ethnicity.white",
            "latest.demographics.race_ethnicity.hispanic",
            "latest.demographics.race_ethnicity.asian",
            "latest.demographics.race_ethnicity.aian",
            "latest.demographics.race_ethnicity.nhpi"
        );

        var url = $"https://api.data.gov/ed/collegescorecard/v1/schools?api_key={_apiKey}&school.name={encodedName}&fields={fields}";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }
}
