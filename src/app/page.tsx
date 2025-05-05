"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchResult {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  images: string[];
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<{
    [key: number]: number;
  }>({});

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery }),
      });

      const data = await response.json();
      setResults(data.results);
      // Initialize selected image index for each product
      const initialIndices = data.results.reduce(
        (acc: { [key: number]: number }, item: SearchResult) => {
          acc[item.id] = 0;
          return acc;
        },
        {}
      );
      setSelectedImageIndex(initialIndices);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const nextImage = (productId: number) => {
    setSelectedImageIndex((prev) => {
      const currentIndex = prev[productId];
      const product = results.find((r) => r.id === productId);
      if (!product) return prev;
      const nextIndex = (currentIndex + 1) % product.images.length;
      return { ...prev, [productId]: nextIndex };
    });
  };

  const prevImage = (productId: number) => {
    setSelectedImageIndex((prev) => {
      const currentIndex = prev[productId];
      const product = results.find((r) => r.id === productId);
      if (!product) return prev;
      const prevIndex =
        (currentIndex - 1 + product.images.length) % product.images.length;
      return { ...prev, [productId]: prevIndex };
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Suanfamama Fashion Search
        </h1>
        <p className="text-lg text-gray-600">
          Find your perfect fashion items with AI-powered search and
          recommendations
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search for tops, bottoms, dresses..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSearch}
            className="absolute right-3 top-3 text-gray-400 hover:text-primary"
            disabled={isLoading}
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={item.images[selectedImageIndex[item.id]]}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />
                {item.images.length > 1 && (
                  <>
                    <button
                      onClick={() => prevImage(item.id)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => nextImage(item.id)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
                    >
                      →
                    </button>
                  </>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold">${item.price}</span>
                  <span className="text-sm text-gray-500">{item.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && results.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Tops", "Bottoms", "Dresses"].map((category) => (
            <div
              key={category}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <img
                src={`/images/categories/${category.toLowerCase()}/${category.toLowerCase()}_category.jpg`}
                alt={category}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{category}</h2>
              <p className="text-gray-600">
                Discover the latest trends in {category.toLowerCase()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
