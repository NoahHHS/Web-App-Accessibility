using Microsoft.VisualBasic;

interface ICrudService<T>{
    void Aanmaken(T obj);
    void Lezen(String Id);
    void Update(T obj);
    void Verwijderen(String Id);
}