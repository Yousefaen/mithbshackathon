
import Container from "./Container";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 bg-gray-50 border-t border-gray-100">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="/" className="text-lg font-semibold text-gray-900">
              Project<span className="text-blue-600">.</span>
            </a>
            <p className="mt-2 text-sm text-gray-600">
              A beautiful starting point for your next web application.
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-8 text-sm">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          &copy; {currentYear} Project. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
