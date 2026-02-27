using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendParcial2MarcoGonzalez.Models
{
    public class Producto
    {
        [Key]
        public int ProductoId { get; set; }

        [Required(ErrorMessage = "El nombre es obligatorio")]
        [StringLength(100, ErrorMessage = "El nombre no puede superar los 100 caracteres")]
        [Display(Name = "Nombre del Producto")]
        public string Nombre { get; set; } = string.Empty;

        [Required(ErrorMessage = "La talla es obligatoria")]
        [StringLength(10, ErrorMessage = "La talla no puede superar los 10 caracteres")]
        public string Talla { get; set; } = string.Empty;

        [Required(ErrorMessage = "El color es obligatorio")]
        [StringLength(50, ErrorMessage = "El color no puede superar los 50 caracteres")]
        public string Color { get; set; } = string.Empty;

        [Required(ErrorMessage = "El precio es obligatorio")]
        [Range(0.01, 99999.99, ErrorMessage = "El precio debe ser mayor a 0")]
        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Precio { get; set; }

        [NotMapped]
        [Display(Name = "Producto")]
        public string NombreCompleto => $"{Nombre} – Talla {Talla} / {Color}";

        public ICollection<DetalleOrden>? DetallesOrden { get; set; }
    }
}
