"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { TESTIMONIALS } from "@/constants/testimonials";
import { type CarouselApi } from "@/components/ui/carousel";
import Image from "next/image";
import TestimonialCard from "./testimonial-card";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const TestimonialCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());

    api.on("slidesChanged", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="min-h-[calc(80vh-2rem)] min-w-[40vw] rounded-l-2xl relative flex items-center justify-center">
      <Image
        className="absolute w-full h-full rounded-l-2xl"
        src="/images/testimonial-bg.png"
        alt="testimonial-bg"
        width={520}
        height={520}
      />
      <Carousel setApi={setApi}>
        <CarouselContent>
          {TESTIMONIALS.map((t) => (
            <CarouselItem key={t.text} className="w-[400px]">
              <TestimonialCard {...t} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute top-12 w-full flex justify-center">
        <Image
          src="/images/logo-grayscale.png"
          alt="logo"
          width={120}
          height={120}
        />
      </div>
      <div className="absolute bottom-12 w-full flex justify-center">
        {TESTIMONIALS.map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-2 h-2 bg-gray-200 rounded-full",
              index === current && "bg-primary"
            )}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel;
