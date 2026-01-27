"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom"; // 1. Pridaný import pluginu
import "yet-another-react-lightbox/styles.css";

export default function GallerySection({ images }: { images: string[] }) {
  const [index, setIndex] = useState(-1);
  const slides = images.map((url) => ({ src: url }));

  return (
    <div className="mb-10">
      <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
        Galéria ({images.length})
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((url, i) => (
          <div
            key={url}
            className="aspect-square rounded-2xl overflow-hidden border border-slate-100 cursor-pointer group"
            onClick={() => setIndex(i)}
          >
            <img
              src={url}
              alt={`Obrázok ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Zoom]} // 2. Aktivácia pluginu
      />
    </div>
  );
}