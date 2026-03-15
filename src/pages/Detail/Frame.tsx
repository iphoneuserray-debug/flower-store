interface FrameProps {
    images: Array<{ src: string; alt: string }>;
}

import useCarousel from "./useCarousel";
import useFancybox from "./useFancybox";

export default function Frame({ images }: FrameProps) {
    const [fancyboxRef] = useFancybox({});
    const [carouselRef] = useCarousel({});
    return (
        <div ref={fancyboxRef} className="w-[400px] h-[500px] object-cover">
            <div ref={carouselRef} className="f-carousel">
                {images.map((img) => (
                    <div
                        key={img.src}
                        className="f-carousel__slide"
                        data-fancybox="gallery"
                        data-src={img.src}
                        data-thumb-src={img.src}
                    >
                        <img
                            src={img.src}
                            width="400"
                            height="500"
                            alt={img.alt}
                            className="w-full h-full object-cover object-center rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}