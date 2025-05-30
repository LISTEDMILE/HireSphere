import React from "react";

const Footer = () => {
  return (
    <footer className="mt-5 bg-gray-900 text-white flex justify-around py-5">
      {/* Social Media Section */}
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl mb-2">Our Social Media...</h1>
        <div>
          <h3 className="text-2xl mt-2">Instagram</h3>
          <p className="text-sm mb-1">ttshks@@123</p>
        </div>
        <div>
          <h3 className="text-2xl mt-2">Discord</h3>
          <p className="text-sm mb-1">lsfjdls @ljfls</p>
        </div>
        <div>
          <h3 className="text-2xl mt-2">YouTube</h3>
          <p className="text-sm mb-1">skjdfkl</p>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl mb-2">Contact us...</h1>
        <div>
          <h3 className="text-2xl mt-2">Mobile</h3>
          <p className="text-sm mb-1">xxx,xxx,xxx,x</p>
          <p className="text-sm mb-1">xxx,xxx,xxx,x</p>
        </div>
        <div>
          <h3 className="text-2xl mt-2">Telephone</h3>
          <p className="text-sm mb-1">xxx,xxx,xxx,x</p>
          <p className="text-sm mb-1">xxx,xxx,xxx,x</p>
        </div>
        <div>
          <h3 className="text-2xl mt-2">Gmail</h3>
          <p className="text-sm mb-1">dkljf4324@gamil.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;