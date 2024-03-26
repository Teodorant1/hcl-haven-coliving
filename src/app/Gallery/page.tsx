import Image from "next/image";
import React from "react";

const Gallery = () => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="group">
          <Image
            src="/placeholder.svg"
            alt="Hotel Interior 1"
            width="300"
            height="300"
            className="aspect-square w-full cursor-pointer overflow-hidden rounded-lg object-cover transition-opacity group-hover:opacity-80"
          />
          <p className="mt-2 text-center">Hotel Interior 1</p>
        </div>
        <div className="group">
          <Image
            src="/placeholder.svg"
            alt="Hotel Exterior 1"
            width="300"
            height="300"
            className="aspect-square w-full cursor-pointer overflow-hidden rounded-lg object-cover transition-opacity group-hover:opacity-80"
          />
          <p className="mt-2 text-center">Hotel Exterior 1</p>
        </div>
        <div className="group">
          <Image
            src="/placeholder.svg"
            alt="Hotel Interior 2"
            width="300"
            height="300"
            className="aspect-square w-full cursor-pointer overflow-hidden rounded-lg object-cover transition-opacity group-hover:opacity-80"
          />
          <p className="mt-2 text-center">Hotel Interior 2</p>
        </div>
        <div className="group">
          <Image
            src="/placeholder.svg"
            alt="Hotel Exterior 2"
            width="300"
            height="300"
            className="aspect-square w-full cursor-pointer overflow-hidden rounded-lg object-cover transition-opacity group-hover:opacity-80"
          />
          <p className="mt-2 text-center">Hotel Exterior 2</p>
        </div>
        <div className="group">
          <Image
            src="/placeholder.svg"
            alt="Hotel Interior 3"
            width="300"
            height="300"
            className="aspect-square w-full cursor-pointer overflow-hidden rounded-lg object-cover transition-opacity group-hover:opacity-80"
          />
          <p className="mt-2 text-center">Hotel Interior 3</p>
        </div>
        <div className="group">
          <Image
            src="/placeholder.svg"
            alt="Hotel Exterior 3"
            width="300"
            height="300"
            className="aspect-square w-full cursor-pointer overflow-hidden rounded-lg object-cover transition-opacity group-hover:opacity-80"
          />
          <p className="mt-2 text-center">Hotel Exterior 3</p>
        </div>
      </div>
      <div>
        <div>
          <button className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 hidden h-10 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            Open Lightbox
          </button>
        </div>
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
