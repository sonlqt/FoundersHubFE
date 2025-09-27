"use client"

import React from 'react'
import Image from 'next/image'
import advertisementMock from "../../../mock/advertisement.json"
import { Advertisement } from '@/type/advertisement'
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"

export default function Advertisements() {
    return (
        <div className="flex flex-col items-center justify-center gap-20">
            {advertisementMock.map((brand: Advertisement) => (
                <Carousel
                    key={brand.id}
                    plugins={[
                        Autoplay({ delay: 2000, stopOnInteraction: true })
                    ]}
                    className="w-full"
                >
                    <CarouselContent>
                        {brand.images.map((img, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1 ">
                                    <Card>
                                        <CardContent className="flex items-center justify-center">
                                            <Image
                                                src={img}
                                                alt={brand.name}
                                                width={300}
                                                height={150}>

                                            </Image>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                  
                </Carousel>
            ))}
        </div>

    )
}

