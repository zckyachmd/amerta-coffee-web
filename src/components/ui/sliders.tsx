import * as React from "react";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface SliderProps {
  imageSlides: { imageUrl: string; url?: string }[];
  autoplayDelay?: number;
  prevButtonText?: string;
  nextButtonText?: string;
}

const Sliders = ({
  imageSlides,
  autoplayDelay,
  prevButtonText,
  nextButtonText,
}: SliderProps) => {
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: autoplayDelay, stopOnInteraction: true })
  );

  return (
    <div className="relative w-full overflow-hidden">
      <Carousel
        plugins={[autoplayPlugin.current]}
        className="w-full h-full"
        onMouseEnter={autoplayPlugin.current.stop}
        onMouseLeave={autoplayPlugin.current.reset}
      >
        <CarouselContent>
          {imageSlides.map((slide, index) => (
            <CarouselItem key={index} className="relative w-full h-full">
              {slide.url ? (
                <Link to={slide.url} className="block w-full h-full">
                  <img
                    src={slide.imageUrl}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                </Link>
              ) : (
                <img
                  src={slide.imageUrl}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute top-1/2 left-16 transform -translate-y-1/2">
          <CarouselPrevious className="p-2 bg-gray-600 hover:bg-gray-500 text-white rounded-full">
            {prevButtonText}
          </CarouselPrevious>
        </div>

        <div className="absolute top-1/2 right-16 transform -translate-y-1/2">
          <CarouselNext className="p-2 bg-gray-600 hover:bg-gray-500 text-white rounded-full">
            {nextButtonText}
          </CarouselNext>
        </div>
      </Carousel>
    </div>
  );
};

export { Sliders };
