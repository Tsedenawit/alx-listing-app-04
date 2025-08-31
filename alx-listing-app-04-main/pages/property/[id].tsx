import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import PropertyDetail from "../../components/property/PropertyDetail";

type Property = {
  id: string | number;
  title?: string;
  description?: string;
  location?: string;
  pricePerNight?: number;
  thumbnailUrl?: string;
  rating?: number;
  amenities?: string[];
};

export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // skip until ID is ready

    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get<Property>(`/api/properties/${id}`);
        setProperty(res.data);
      } catch (err: unknown) {
        setError("Failed to load property details.");
        console.error("Error fetching property details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <p className="p-4">Loading property details...</p>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        {error}
        <button
          className="ml-3 rounded bg-black px-3 py-1 text-white"
          onClick={() => router.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!property) {
    return <p className="p-4">Property not found.</p>;
  }

  return <PropertyDetail property={property} />;
}
