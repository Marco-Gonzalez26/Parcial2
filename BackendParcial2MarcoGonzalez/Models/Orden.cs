using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendParcial2MarcoGonzalez.Models
{
    public class Orden
    {
        [Key]
        public int OrdenId { get; set; }

        [Required(ErrorMessage = "El cliente es obligatorio")]
        [Display(Name = "Cliente")]
        public int ClienteId { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        [Display(Name = "Fecha de Orden")]
        public DateTime FechaOrden { get; set; } = DateTime.UtcNow;

        [Required(ErrorMessage = "El estado es obligatorio")]
        [StringLength(20)]
        [RegularExpression("^(Pendiente|Completada|Cancelada)$",
            ErrorMessage = "El estado debe ser: Pendiente, Completada o Cancelada")]
        public string Estado { get; set; } = "Pendiente";

        [Required]
        [Range(0, 999999.99, ErrorMessage = "El total no puede ser negativo")]
        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Total { get; set; }

        [ForeignKey("ClienteId")]
        public Cliente? Cliente { get; set; }

        public ICollection<DetalleOrden>? DetallesOrden { get; set; }
    }
}
