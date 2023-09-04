using PruebaTecnica.Models;

namespace PruebaTecnica.Services.Contrato
{
    public interface IProfesoresService
    {
        Task<List<Profesores>> GetList();
        Task<Profesores> Get(int IdProfesor);
        Task<Profesores> Add(Profesores modelo);
        Task<bool> Update(Profesores modelo, Profesores _profesor);
        Task<bool> Delete(Profesores modelo);
    }
}
