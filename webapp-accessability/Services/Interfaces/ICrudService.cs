using Microsoft.VisualBasic;

interface ICrudService<T>{
    void Aanmaken(T obj);
    void Lezen(int Id);
    void Update(T obj);
    void Verwijderen(int Id);
}