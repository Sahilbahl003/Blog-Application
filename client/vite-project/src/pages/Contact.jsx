
const Contact = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-5xl grid md:grid-cols-2 gap-8">

        <div className="flex items-center justify-center">
          <div className="w-64 h-64 bg-blue-200 rounded-xl flex items-center justify-center">
            
            <img src="contact.png" width={256} height={256}/>
          </div>
        </div>


        <div className="flex flex-col justify-center space-y-4 text-blue-900">
          <h1 className="text-3xl font-bold mb-4">
            Contact Us
          </h1>

          <p>Phone: +91 98888 77777</p>
          <p>Email: support@blogApp.com</p>
          <p>Location: Mohali, India</p>
          <p>Instagram: instagram.com/blogApp</p>
          <p>Twitter: twitter.com/blogApp</p>
          <p>LinkedIn: linkedin.com/company/blogApp</p>
        </div>

      </div>

    </div>
  );
};

export default Contact;
