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
    public class DetalleOrdenesController : ControllerBase
    {
        private readonly BackendDbContext _context;

        public DetalleOrdenesController(BackendDbContext context)
        {
            _context = context;
        }

        // GET: api/DetalleOrdenes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DetalleOrden>>> GetDetalleOrdenes()
        {
            return await _context.DetalleOrdenes.ToListAsync();
        }

        // GET: api/DetalleOrdenes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DetalleOrden>> GetDetalleOrden(int id)
        {
            var detalleOrden = await _context.DetalleOrdenes.FindAsync(id);

            if (detalleOrden == null)
            {
                return NotFound();
            }

            return detalleOrden;
        }

        // PUT: api/DetalleOrdenes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDetalleOrden(int id, DetalleOrden detalleOrden)
        {
            if (id != detalleOrden.DetalleOrdenId)
            {
                return BadRequest();
            }

            _context.Entry(detalleOrden).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DetalleOrdenExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DetalleOrdenes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DetalleOrden>> PostDetalleOrden(DetalleOrden detalleOrden)
        {
            _context.DetalleOrdenes.Add(detalleOrden);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDetalleOrden", new { id = detalleOrden.DetalleOrdenId }, detalleOrden);
        }

        // DELETE: api/DetalleOrdenes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDetalleOrden(int id)
        {
            var detalleOrden = await _context.DetalleOrdenes.FindAsync(id);
            if (detalleOrden == null)
            {
                return NotFound();
            }

            _context.DetalleOrdenes.Remove(detalleOrden);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DetalleOrdenExists(int id)
        {
            return _context.DetalleOrdenes.Any(e => e.DetalleOrdenId == id);
        }
    }
}
