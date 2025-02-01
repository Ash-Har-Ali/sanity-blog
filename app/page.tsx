"use client";

import React, { useEffect, useState } from "react";
import Carousel from "./components/BannerCarousel";
import Image from "next/image";
import showCaseImage from "../public/images/showcase.svg";
import CTAButton from "./components/CTAButton";
import { productsQuery } from "../sanity/lib/queries";
import { client } from "../sanity/lib/client";

interface Product {
  _id: string;
  productName: string;
  slug: string;
  imagesGallery: {
    asset: {
      _id: string;
      url: string;
    };
    alt: string;
  }[];
  Price: number;
  bldc: string;
  category: string;
}

const ProductsGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  useEffect(() => {
    client
      .fetch(productsQuery)
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="overflow-x-auto hide-scrollbar px-4">
        <div className="flex space-x-6 sm:space-x-10 md:space-x-14 lg:space-x-20 items-end">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col items-center"
              onMouseEnter={() => setHoveredProduct(product._id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {product.imagesGallery && product.imagesGallery.length > 0 && (
                <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-auto transition-all duration-300">
                  <Image
                    src={
                      hoveredProduct === product._id && product.imagesGallery.length > 1
                        ? product.imagesGallery[1].asset.url
                        : product.imagesGallery[0].asset.url
                    }
                    alt={product.imagesGallery[0].alt || product.productName}
                    layout="responsive"
                    width={300}
                    height={300}
                    className="object-contain"
                  />
                </div>
              )}
              <div className="w-[200px] sm:w-[250px] md:w-[300px] border rounded-lg shadow-lg bg-white p-3 mt-2 text-center">
                <h3 className="text-sm sm:text-base md:text-lg font-semibold">
                  {product.productName}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const HomePage = () => {
  return (
    <div>
      <div className="w-full">
        <Carousel />
      </div>
      <div className="relative w-full h-[526px] sm:h-[600px] lg:h-[650px]">
        <div className="absolute inset-0 bg-[#e7e7e7]" />
        <div className="absolute left-1/2 top-[50px] transform -translate-x-1/2 text-center text-[#303030] text-[34px] font-semibold font-['Montserrat'] sm:text-[40px] md:text-[48px] lg:text-[54px]">
          Popular Products
        </div>
        <div className="absolute left-1/2 top-[180px] transform -translate-x-1/2 flex flex-col items-center space-y-6">
          <div className="text-white/60 text-[80px] sm:text-[140px] md:text-[180px] lg:text-[200px] font-bold font-['Montserrat']">
            Explore
          </div>
        </div>
        <div className="absolute bottom-[70px] left-1/2 transform -translate-x-1/2 w-full">
          <ProductsGrid />
        </div>
      </div>
      <div className="relative w-full max-w-[1438px] h-[546px] sm:h-[600px] md:h-[650px] mt-24">
        <div className="absolute left-[186px] top-[42px] text-[#303030] text-[34px] font-semibold font-['Montserrat'] sm:text-[28px] md:text-[34px] lg:text-[38px]">
          Why
          <br />
          Choose Solarcool?
        </div>
        <div className="absolute left-[186px] top-[139px] w-[90%] sm:w-[80%] md:w-[615px] text-black text-base font-normal font-['Montserrat'] leading-normal sm:text-sm md:text-base lg:text-lg">
          “Solar cool” is established to bring solar products to everyone’s daily life...
        </div>
        <Image
          className="absolute inset-0 w-full h-full object-cover"
          src={showCaseImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute left-1/2 top-[430px] transform -translate-x-1/2 sm:top-[500px] md:top-[530px]">
          <CTAButton
            label="Know More"
            navigateTo="/products"
            bgColor="#fff"
            textColor="#000"
            width="auto"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
