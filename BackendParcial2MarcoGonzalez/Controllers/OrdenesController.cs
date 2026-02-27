using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendParcial2MarcoGonzalez.Models;

namespace BackendParcial2MarcoGonzalez.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class OrdenesController : ControllerBase
    {
        private readonly BackendDbContext _context;

        public OrdenesController(BackendDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Orden>>> GetOrdenes()
        {
            return await _context.Ordenes
                .Include(o => o.Cliente)
                .Include(o => o.DetallesOrden)
                    .ThenInclude(d => d.Producto)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Orden>> GetOrden(int id)
        {
            var orden = await _context.Ordenes
                .Include(o => o.Cliente)
                .Include(o => o.DetallesOrden)
                    .ThenInclude(d => d.Producto)
                .FirstOrDefaultAsync(o => o.OrdenId == id);

            if (orden == null) return NotFound();

            return orden;
        }

        [HttpPost]
        public async Task<ActionResult<Orden>> PostOrden(Orden orden)
        {
            if (orden.DetallesOrden == null || !orden.DetallesOrden.Any())
                return BadRequest(new { message = "La orden debe tener al menos un producto." });

            var clienteExiste = await _context.Clientes.AnyAsync(c => c.ClienteId == orden.ClienteId);
            if (!clienteExiste)
                return NotFound(new { message = "Cliente no encontrado." });

            foreach (var detalle in orden.DetallesOrden)
            {
                var producto = await _context.Productos.FindAsync(detalle.ProductoId);
                if (producto == null)
                    return NotFound(new { message = $"Producto {detalle.ProductoId} no encontrado." });

                detalle.PrecioUnitario = producto.Precio;
            }

            orden.Total = orden.DetallesOrden.Sum(d => d.PrecioUnitario * d.Cantidad);
            orden.Estado = "Pendiente";
            orden.FechaOrden = DateTime.UtcNow;

            _context.Ordenes.Add(orden);
            await _context.SaveChangesAsync();

            var ordenCreada = await _context.Ordenes
                .Include(o => o.Cliente)
                .Include(o => o.DetallesOrden)
                    .ThenInclude(d => d.Producto)
                .FirstAsync(o => o.OrdenId == orden.OrdenId);

            return CreatedAtAction(nameof(GetOrden), new { id = orden.OrdenId }, ordenCreada);
        }

        [HttpPatch("{id}/estado")]
        public async Task<IActionResult> PatchEstado(int id, UpdateEstadoViewModel vm)
        {
            var estadosValidos = new[] { "Pendiente", "Completada", "Cancelada" };
            if (!estadosValidos.Contains(vm.Estado))
                return BadRequest(new { message = "Estado inválido. Use: Pendiente, Completada o Cancelada." });

            var orden = await _context.Ordenes.FindAsync(id);
            if (orden == null) return NotFound();

            orden.Estado = vm.Estado;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrden(int id)
        {
            var orden = await _context.Ordenes.FindAsync(id);
            if (orden == null) return NotFound();

            _context.Ordenes.Remove(orden);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrdenExists(int id)
        {
            return _context.Ordenes.Any(e => e.OrdenId == id);
        }
    }
}
