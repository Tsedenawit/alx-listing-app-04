import ReviewSection from "./ReviewSection";

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

type Props = {
  property: Property;
};

export default function PropertyDetail({ property }: Props) {
  return (
    <section className="p-6">
      <div className="mb-6 h-64 w-full overflow-hidden rounded-lg bg-gray-100">
        {property.thumbnailUrl ? (
          <img
            src={property.thumbnailUrl}
            alt={property.title ?? "Property image"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            No image available
          </div>
        )}
      </div>

      <h1 className="mb-2 text-2xl font-bold">{property.title}</h1>
      <p className="text-gray-600">{property.location}</p>
      <p className="mt-4 text-lg text-gray-800">
        Price per night:{" "}
        <span className="font-semibold">
          {property.pricePerNight ? `R${property.pricePerNight}` : "—"}
        </span>
      </p>

      {property.rating != null && (
        <p className="mt-2 text-yellow-600">⭐ {property.rating}</p>
      )}

      {property.description && (
        <p className="mt-4 text-gray-700">{property.description}</p>
      )}

      {property.amenities && property.amenities.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2 text-lg font-semibold">Amenities</h2>
          <ul className="list-disc pl-6 text-gray-700">
            {property.amenities.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}
      <ReviewSection propertyId={property.id} />
    </section>
  );
}
