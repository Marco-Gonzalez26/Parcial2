using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendParcial2MarcoGonzalez.Models
{
    public class Cliente
    {
        [Key]
        public int ClienteId { get; set; }

        [Required(ErrorMessage = "El nombre es obligatorio")]
        [StringLength(100, ErrorMessage = "El nombre no puede superar los 100 caracteres")]
        public string Nombre { get; set; } = string.Empty;

        [Required(ErrorMessage = "El apellido es obligatorio")]
        [StringLength(100, ErrorMessage = "El apellido no puede superar los 100 caracteres")]
        public string Apellido { get; set; } = string.Empty;

        [Required(ErrorMessage = "El email es obligatorio")]
        [EmailAddress(ErrorMessage = "Formato de email no válido")]
        [StringLength(150, ErrorMessage = "El email no puede superar los 150 caracteres")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "El teléfono es obligatorio")]
        [Phone(ErrorMessage = "Formato de teléfono no válido")]
        [StringLength(20, ErrorMessage = "El teléfono no puede superar los 20 caracteres")]
        [Display(Name = "Teléfono")]
        public string Telefono { get; set; } = string.Empty;

        [NotMapped]
        [Display(Name = "Cliente")]
        public string NombreCompleto => $"{Nombre} {Apellido}";

        public ICollection<Orden>? Ordenes { get; set; }
    }
}
