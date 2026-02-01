"use client"
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface CarouselSectionProps {
  title?: string;
  items?: {
    title?: string;
    description?: string;
    imageUrl?: string;
  }[];
}

export default function CarouselSection({ title, items }: CarouselSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-12 w-full">
      {title && <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">{title}</h2>}
      
      <div className="px-12"> {/* Odsadenie kvôli šípkam */}
        <Carousel 
          opts={{ align: "start", loop: true }} 
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {items.map((item, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden border-none shadow-md">
                    <CardContent className="p-0">
                      {item.imageUrl && (
                        <img 
                          src={item.imageUrl} 
                          alt={item.title || "carousel-img"} 
                          className="w-full aspect-video object-cover"
                        />
                      )}
                      <div className="p-6">
                        <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                        <p className="text-slate-600 text-sm line-clamp-2">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-6 md:-left-12" />
          <CarouselNext className="-right-6 md:-right-12" />
        </Carousel>
      </div>
    </section>
  )
}