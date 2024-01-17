using Microsoft.VisualBasic;

interface ICrudService<T>{
    void Create(T obj);
    void Read(String Id);
    void Update(T obj);
    void Delete(String Id);
}