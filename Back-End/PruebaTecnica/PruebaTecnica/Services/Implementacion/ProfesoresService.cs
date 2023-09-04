using Microsoft.EntityFrameworkCore;
using PruebaTecnica.Models;
using PruebaTecnica.Services.Contrato;

namespace PruebaTecnica.Services.Implementacion
{
    public class ProfesoresService : IProfesoresService
    {
        private DbPruebaTecnicaContext _dbContext;

        public ProfesoresService(DbPruebaTecnicaContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Profesores>> GetList()
        {
            try
            {
                List<Profesores> lista = new List<Profesores>();
                lista = await _dbContext.Profesores.ToListAsync();
                return lista;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Profesores> Get(int IdProfesor)
        {
            try
            {
                Profesores Id = new Profesores();

                Id = await _dbContext.Profesores.Where(e => e.Identificacion == IdProfesor).FirstOrDefaultAsync();

                return Id;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Profesores> Add(Profesores modelo)
        {
            try
            {
                _dbContext.Profesores.Add(modelo);
                await _dbContext.SaveChangesAsync();
                return modelo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> Update(Profesores modelo, Profesores _profesor)
        {
            try
            {

                if (_profesor != null)
                { 
                    _dbContext.Profesores.Remove(modelo);
                    await _dbContext.SaveChangesAsync();

                    _dbContext.Profesores.Add(_profesor);
                    await _dbContext.SaveChangesAsync();
                    return true;
                }
                else
                {
                    return false; 
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> Delete(Profesores modelo)
        {
            try
            {
                _dbContext.Profesores.Remove(modelo);
                await _dbContext.SaveChangesAsync();
                return true;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

       
        

    }
}
