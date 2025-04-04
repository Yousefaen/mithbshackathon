
import { ArrowRight } from "lucide-react";
import Container from "./Container";

const Hero = () => {
  return (
    <div className="w-full py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <Container className="flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
          Start Building <span className="text-blue-600">Something Great</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl">
          A clean and minimal foundation for your next web application project. Customize and extend as needed.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <a
            href="#"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            Get Started <ArrowRight size={16} />
          </a>
          <a
            href="#"
            className="px-6 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all"
          >
            Learn More
          </a>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
