using AutoMapper;
using PruebaTecnica.DTOs;
using PruebaTecnica.Models;
using System.Globalization;


namespace PruebaTecnica.Utilidades
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile() 
        {
            #region Profesores 
            CreateMap<Profesores, ProfesoresDTO>().ReverseMap();
            #endregion
        }
    }
}
