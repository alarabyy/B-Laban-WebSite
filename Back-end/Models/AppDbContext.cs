using Microsoft.EntityFrameworkCore;

namespace Belabn.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<MenuItem> MenuItems { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<ContactMessage> ContactMessages { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<CreateYourDish> CreatedDishes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserModel> UsersModel { get; set; } // ✅ تصحيح اسم الحرف الأول إلى Capital لتناسق التسمية
    }
}
