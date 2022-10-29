using System.Collections.Generic;

namespace flowerbackend.Services
{
    public interface IService<T>
    {
        public IEnumerable<T> GetList();
        public T Add(T entity);
    }
}
