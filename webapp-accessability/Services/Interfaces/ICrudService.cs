using Microsoft.VisualBasic;

interface ICrudService<T>{
    void Create(T obj);
    T Read(String Id);
    void Update(string Id, T obj);
    void Delete(String Id);
}