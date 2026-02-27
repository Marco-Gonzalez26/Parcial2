using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendParcial2MarcoGonzalez.Models
{
    public class DetalleOrden
    {
        [Key]
        public int DetalleOrdenId { get; set; }

        [Required(ErrorMessage = "La orden es obligatoria")]
        [Display(Name = "Orden")]
        public int OrdenId { get; set; }

        [Required(ErrorMessage = "El producto es obligatorio")]
        [Display(Name = "Producto")]
        public int ProductoId { get; set; }

        [Required(ErrorMessage = "La cantidad es obligatoria")]
        [Range(1, 1000, ErrorMessage = "La cantidad debe ser entre 1 y 1000")]
        public int Cantidad { get; set; }

        [Required(ErrorMessage = "El precio unitario es obligatorio")]
        [Range(0.01, 99999.99, ErrorMessage = "El precio unitario debe ser mayor a 0")]
        [DataType(DataType.Currency)]
        [Display(Name = "Precio Unitario")]
        [Column(TypeName = "decimal(10,2)")]
        public decimal PrecioUnitario { get; set; }

        [NotMapped]
        [Display(Name = "Subtotal")]
        public decimal Subtotal => Cantidad * PrecioUnitario;

        [ForeignKey("OrdenId")]
        public Orden? Orden { get; set; }

        [ForeignKey("ProductoId")]
        public Producto? Producto { get; set; }
    }
}
