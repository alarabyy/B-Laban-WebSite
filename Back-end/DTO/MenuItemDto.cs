﻿namespace Belabn.DTO
{
    public class MenuItemDto
    {
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public decimal Price { get; set; }
        public IFormFile Image { get; set; }
    }

}
