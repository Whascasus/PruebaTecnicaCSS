using PruebaTecnica.Models;
using Microsoft.EntityFrameworkCore;
using PruebaTecnica.Services.Contrato;
using PruebaTecnica.Services.Implementacion;
using AutoMapper;
using PruebaTecnica.DTOs;
using PruebaTecnica.Utilidades;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



builder.Services.AddDbContext<DbPruebaTecnicaContext>(options =>{
    options.UseSqlServer(builder.Configuration.GetConnectionString("cadenaSQL"));
});

builder.Services.AddScoped<IProfesoresService, ProfesoresService>();
builder.Services.AddScoped<ILoginService, LoginService>();

builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

builder.Services.AddCors(options =>
{
    options.AddPolicy("NewPolicy", app =>
    {
        app.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

#region Peticiones API REST
app.MapGet("/profesores/lista", async (
    IProfesoresService _profesoresServicio,
    IMapper _mapper
    ) =>
{
    var listaProfesores = await _profesoresServicio.GetList();
    var listaProfesoresDTO = _mapper.Map<List<ProfesoresDTO>>(listaProfesores);

    if (listaProfesoresDTO.Count > 0)
        return Results.Ok(listaProfesoresDTO);
    else
        return Results.NotFound();

});

app.MapGet("/profesores/getProfesor/{idProfesor}", async (
    int idProfesor,
    IProfesoresService _profesoresServicio,
    IMapper _mapper
    ) =>
{
    var Resultado = await _profesoresServicio.Get(idProfesor);


    if (Resultado == null)
        return Results.StatusCode(StatusCodes.Status500InternalServerError);
    else
        return Results.Ok(_mapper.Map<Profesores>(Resultado));

});

app.MapPost("/profesores/guardar", async (
    ProfesoresDTO modelo,
    IProfesoresService _profesoresServicio,
    IMapper _mapper
    ) => {

    var _profesor = _mapper.Map<Profesores>(modelo);
    var _profesorCreado = await _profesoresServicio.Add(_profesor);

    if (_profesorCreado.Identificacion != 0)
        return Results.Ok(_mapper.Map<ProfesoresDTO>(_profesorCreado));
    else
        return Results.StatusCode(StatusCodes.Status500InternalServerError);

});

app.MapPut("/profesores/actualizar/{idProfesor}", async (
    int idProfesor,
    ProfesoresDTO modelo,
    IProfesoresService _profesoresServicio,
    IMapper _mapper
    ) => {

        var _Resultado = await _profesoresServicio.Get(idProfesor);

        if (_Resultado is null) return Results.NotFound();
        var _profesor = _mapper.Map<Profesores>(modelo);

        _Resultado.TipoIdentificacion = _profesor.TipoIdentificacion;
        _Resultado.Nombres = _profesor.Nombres;
        _Resultado.Apellidos = _profesor.Apellidos;
        _Resultado.CorreoElectronico = _profesor.CorreoElectronico;
        _Resultado.TelefonoCelular = _profesor.TelefonoCelular;
        _Resultado.NumeroContrato = _profesor.NumeroContrato;
        _Resultado.CiudadResidencia = _profesor.CiudadResidencia;
        _Resultado.EscalafonTecnico = _profesor.EscalafonTecnico;
        _Resultado.EscalafonExtension = _profesor.EscalafonExtension;

        var respuesta = await _profesoresServicio.Update(_Resultado, _profesor);

        if (respuesta)
            return Results.Ok(_mapper.Map<ProfesoresDTO>(_Resultado));
        else
            return Results.StatusCode(StatusCodes.Status500InternalServerError);

    });

app.MapDelete("/profesores/eliminar/{idProfesor}", async (
    int idProfesor,
    IProfesoresService _profesoresServicio,
    IMapper _mapper
    ) => {

        var _Resultado = await _profesoresServicio.Get(idProfesor);

        if (_Resultado is null) return Results.NotFound();

        var respuesta = await _profesoresServicio.Delete(_Resultado);

        if (respuesta)
            return Results.Ok("El Docente se ha eliminado con éxito.");
        else
            return Results.StatusCode(StatusCodes.Status500InternalServerError);

    });

app.MapPost("/login", async (
    LoginDTO modelo,
    ILoginService _loginService
    ) => {
        bool isAuthenticated = await _loginService.AuthenticateAsync(modelo.Usuario, modelo.Contrasena);

        if (isAuthenticated)
        {
            return Results.Ok("Inicio de sesión exitoso"); 
        }
        else
        {
            return Results.BadRequest("Credenciales inválidas"); 
        }
    });

#endregion

app.UseCors("NewPolicy");

app.Run();

