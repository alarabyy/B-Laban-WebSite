using System.ComponentModel.DataAnnotations;

namespace Belabn.Models;
public class CreateYourDish
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string DishName { get; set; } = string.Empty;

    [Required]
    [StringLength(1000)]
    public string Ingredients { get; set; } = string.Empty;
    [Required]
    [EmailAddress]
    public string email { get; set; } = string.Empty;
    [Required]
    [MaxLength(150)]
    public string fullname { get; set; } = string.Empty;

    [Display(Name = "Image URL")]
    public string? ImageUrl { get; set; }


}

