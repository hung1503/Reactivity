using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Email { get; set; }
         [Required]
         [EmailAddress]
        public string DisplayName { get; set; }
         [Required]
         [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Password must have 1 uppercase, 1 lowercase, 1 number, 1 non alphanumeric and at least 4 characters")]
        public string Password { get; set; }
         [Required]
        public string Username { get; set; }
    }
}