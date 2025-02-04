namespace Application.Core
{
    public class AppException
    {
        public AppException(int StatusCode, string Message, string Details = null)
        {
            this.StatusCode = StatusCode;
            this.Message = Message;
            this.Details = Details;
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
    }
}