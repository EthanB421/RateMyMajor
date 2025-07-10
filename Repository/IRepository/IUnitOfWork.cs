namespace RateMyMajor.Repository.IRepository
{
    public interface IUnitOfWork
    {
        IMajorRepository Major {get;}

        void Save();
    }
}