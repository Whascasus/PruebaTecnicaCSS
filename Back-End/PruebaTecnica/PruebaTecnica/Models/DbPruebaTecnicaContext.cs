using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace PruebaTecnica.Models;

public partial class DbPruebaTecnicaContext : DbContext
{
    public DbPruebaTecnicaContext()
    {
    }

    public DbPruebaTecnicaContext(DbContextOptions<DbPruebaTecnicaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Profesores> Profesores { get; set; }
    public virtual DbSet<Login> Login { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { 

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Profesores>(entity =>
        {
            entity.HasKey(e => e.Identificacion).HasName("PK__Profesor__D6F931E4929EEF35");

            entity.Property(e => e.Apellidos)
                .HasMaxLength(45)
                .IsUnicode(false);
            entity.Property(e => e.CiudadResidencia)
                .HasMaxLength(45)
                .IsUnicode(false);
            entity.Property(e => e.CorreoElectronico)
                .HasMaxLength(45)
                .IsUnicode(false);
            entity.Property(e => e.EscalafonExtension)
                .HasMaxLength(45)
                .IsUnicode(false);
            entity.Property(e => e.EscalafonTecnico)
                .HasMaxLength(45)
                .IsUnicode(false);
            entity.Property(e => e.Nombres)
                .HasMaxLength(45)
                .IsUnicode(false);
            entity.Property(e => e.TipoIdentificacion)
                .HasMaxLength(45)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Login>(entity =>
        {
            entity.HasKey(e => e.IdUser).HasName("PK__User__D6F931E4929EEF35");

            entity.Property(e => e.Usuario)
                .HasMaxLength(45)
                .IsUnicode(false);
            entity.Property(e => e.contrasena)
                .HasMaxLength(45)
                .IsUnicode(false);

        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
