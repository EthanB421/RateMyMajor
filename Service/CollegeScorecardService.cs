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

    public async Task<string> GetCollegeDataAsync(string unitId)
    {
        var fields = string.Join(',',
            "school.name",
            "id",
            "fed_sch_cd",
            "latest.cost.attendance.academic_year",
            "latest.cost.booksupply",
            "latest.cost.roomboard.oncampus",
            "latest.cost.otherexpense.oncampus",
            "latest.cost.roomboard.offcampus",
            "latest.cost.otherexpense.offcampus",
            "latest.cost.tuition.in_state",
            "latest.cost.tuition.out_of_state",
            "latest.aid.federal_loan_rate",
            "latest.cost.otherexpense.withfamily",
            "latest.earnings.1_yr_after_completion.median",
            "latest.earnings.4_yrs_after_completion.median",
            "latest.earnings.5_yrs_after_completion.median",
            "latest.earnings.cip_4_digit.4_yr.male_median_earnings",
            "latest.completion.completion_rate_4yr_150nt",
            "latest.repayment.1_yr_bb_fed_repayment.grcomp.fully_paid",
            "latest.student.demographics.race_ethnicity.black",
            "latest.student.demographics.race_ethnicity.white",
            "latest.student.demographics.race_ethnicity.hispanic",
            "latest.student.demographics.race_ethnicity.asian",
            "latest.student.demographics.race_ethnicity.aian",
            "latest.student.demographics.race_ethnicity.nhpi",
            "latest.student.size",
            "latest.academics.program_reporter.programs_offered",
            "latest.admissions.sat_scores.average.overall",
            "latest.admissions.admission_rate_suppressed.overall",
            "latest.repayment.3_yr_repayment.income.0_30000",
            "latest.repayment.3_yr_repayment.income.30000_75000",
            "latest.repayment.3_yr_repayment.income.greater_than_75000",
            "latest.repayment.5_yr_repayment.income.0_30000",
            "latest.repayment.5_yr_repayment.income.30000_75000",
            "latest.repayment.5_yr_repayment.income.greater_than_75000"
        );

        var url = $"https://api.data.gov/ed/collegescorecard/v1/schools?api_key={_apiKey}&fed_sch_cd={unitId}&fields={fields}";

        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }
}