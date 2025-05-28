using System.ComponentModel.DataAnnotations;

namespace Belabn.Models
{
    public class ContactMessage
    {
        public int Id { get; set; }

        [StringLength(100)]
        public string Subject { get; set; } = string.Empty;
        [EmailAddress]
        public string email { get; set; } = string.Empty;
        [MaxLength(150)]
        public string fullname { get; set; } = string.Empty;

        [StringLength(1000)]
        public string Message { get; set; } = string.Empty;

        [DataType(DataType.DateTime)]
        public DateTime SentDate { get; set; } = DateTime.Now;


    }
}
