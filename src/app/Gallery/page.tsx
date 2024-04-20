import Image from "next/image";
import React from "react";

const Gallery = () => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="group">
          <Image
            src="https://imagedelivery.net/Q9F_VW9Wo-_WrvOGy6WAeQ/433a3a36-a003-4b5d-c4b6-1f4ee4cd2700/public"
            alt="Hotel Interior 1"
            width="1000"
            height="1000"
            className="aspect-square w-full cursor-pointer overflow-hidden rounded-lg object-cover transition-opacity group-hover:opacity-80"
          />
          <p className="mt-2 text-center">Hotel Interior 1</p>
        </div>
        <div className="group">
          <Image
            src="https://imagedelivery.net/Q9F_VW9Wo-_WrvOGy6WAeQ/961ceadb-e90f-45e1-7261-d70130d34900/public"
            alt="Hotel Exterior 1"
            width="1000"
            height="1000"
            className="aspect-square w-full cursor-pointer overflow-hidden rounded-lg object-cover transition-opacity group-hover:opacity-80"
          />
          <p className="mt-2 text-center">Hotel Exterior 1</p>
        </div>
        <div className="group">
          <Image
            src="https://imagedelivery.net/Q9F_VW9Wo-_WrvOGy6WAeQ/34d8dc6e-ba6d-4b7a-14ce-ee149bc35600/public"
            alt="Hotel Interior 2"
            width="1000"
            height="1000"
            className="aspect-square w-full cursor-pointer overflow-hidden rounded-lg object-cover transition-opacity group-hover:opacity-80"
          />
          <p className="mt-2 text-center">Hotel Interior 2</p>
        </div>
        <div className="group">
          <Image
            src="https://imagedelivery.net/Q9F_VW9Wo-_WrvOGy6WAeQ/0ceaf862-10eb-4789-2aa0-736acfd45e00/public"
            alt="Hotel Exterior 2"
            width="1000"
            height="1000"
            className="aspect-square w-full cursor-pointer overflow-hidden rounded-lg object-cover transition-opacity group-hover:opacity-80"
          />
          <p className="mt-2 text-center">Hotel Exterior 2</p>
        </div>
        <div className="group">
          <Image
            src="/placeholder.svg"
            alt="Hotel Interior 3"
            width="1000"
            height="1000"
            className="aspect-square w-full cursor-pointer overflow-hidden rounded-lg object-cover transition-opacity group-hover:opacity-80"
          />
          <p className="mt-2 text-center">Hotel Interior 3</p>
        </div>
        <div className="group">
          <Image
            src="/placeholder.svg"
            alt="Hotel Exterior 3"
            width="1000"
            height="1000"
            className="aspect-square w-full cursor-pointer overflow-hidden rounded-lg object-cover transition-opacity group-hover:opacity-80"
          />
          <p className="mt-2 text-center">Hotel Exterior 3</p>
        </div>
      </div>
      <div>
        <div>
          <button className="hidden h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
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
