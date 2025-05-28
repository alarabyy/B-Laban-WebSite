using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Belabn.DTOs;

public class CreateYourDishDTO
{
    [Required]
    [StringLength(100)]
    public string DishName { get; set; } = string.Empty;

    [Required]
    [StringLength(1000)]
    public string Ingredients { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MaxLength(150)]
    public string Fullname { get; set; } = string.Empty;

    // الصورة هتترفع من الفورم
    [Display(Name = "Dish Image")]
    public IFormFile? Image { get; set; }
}
