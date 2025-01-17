'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import banner from "../../../public/images/banner-ac.svg";
import { productsQuery } from '../../../sanity/lib/queries'; // Import your groq queries
import ProductCard from '../../components/ProductCard'; // Import the ProductCard component
import { client } from '../../../sanity/lib/client'; // Import your Sanity client setup

interface Category {
  _id: string;
  title: string;
}

interface Product {
  _id: string;
  productName: string;
  slug: string;
  imagesGallery: { asset: { url: string }; alt: string }[]; // Array of images
  Price: number;
  bldc: boolean;
  categories: Category[] | null; // Allow null for categories
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await client.fetch(productsQuery);
        setProducts(fetchedProducts);
      } catch (error) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="relative mb-12">
        <Image
          src={banner}
          alt="Air Conditioner Banner"
          className="w-full h-auto object-cover"
          priority // Added the priority prop to the banner image
        />
        <div className="absolute inset-0 flex items-center justify-center text-[#048c46] text-center text-4xl md:text-6xl font-bold font-['Montserrat']">
          Air Conditioner
        </div>
      </div>

      {/* Products Section */}
      <div className="p-5">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              images={product.imagesGallery.map(image => ({ url: image.asset.url, alt: image.alt }))}
              name={product.productName}
              price={product.Price}
              categories={product.categories ? product.categories.map((cat) => cat.title) : []}
              isBLDC={product.bldc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
