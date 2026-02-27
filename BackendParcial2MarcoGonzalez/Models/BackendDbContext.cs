using Microsoft.EntityFrameworkCore;

namespace BackendParcial2MarcoGonzalez.Models
{
    public class BackendDbContext: DbContext
    {
        public BackendDbContext(DbContextOptions<BackendDbContext> options)
    : base(options)
        {
        }

        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Orden> Ordenes { get; set; }
        public DbSet<Producto> Productos { get; set; }

        public DbSet<DetalleOrden>  DetalleOrdenes { get; set; }
    }
}
