import axios from "axios";
import { useEffect, useState } from "react";
import PropertyCard from "@/components/property/PropertyCard";

type Property = {
  id: string | number;
  title?: string;
  location?: string;
  pricePerNight?: number;
  thumbnailUrl?: string;
  rating?: number;
};

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get<Property[]>("/api/properties");
        if (!cancelled) setProperties(res.data ?? []);
      } catch (err: unknown) {
        if (!cancelled)
          setError("Failed to load properties. Please try again.");
        console.error("Error fetching properties:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProperties();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-lg border p-4 space-y-3"
          >
            <div className="h-40 w-full rounded bg-gray-200" />
            <div className="h-4 w-2/3 rounded bg-gray-200" />
            <div className="h-4 w-1/2 rounded bg-gray-200" />
            <div className="h-4 w-1/3 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="rounded border border-red-300 bg-red-50 p-4 text-red-700">
          {error}
        </div>
        <button
          onClick={() => location.reload()}
          className="mt-3 rounded bg-black px-4 py-2 text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!properties.length) {
    return (
      <div className="p-4">
        <div className="rounded border bg-gray-50 p-6 text-gray-700">
          No properties found.
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
