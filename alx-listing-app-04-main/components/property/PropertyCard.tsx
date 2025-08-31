type Property = {
  id: string | number;
  title?: string;
  location?: string;
  pricePerNight?: number;
  thumbnailUrl?: string;
  rating?: number;
};

type Props = { property: Property };

export default function PropertyCard({ property }: Props) {
  return (
    <article className="rounded-lg border p-4">
      <div className="mb-3 h-40 w-full overflow-hidden rounded bg-gray-100">
        {property.thumbnailUrl ? (
          // If using next/image, replace with <Image ... />
          <img
            src={property.thumbnailUrl}
            alt={property.title ?? "Property"}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            No image
          </div>
        )}
      </div>
      <h3 className="mb-1 text-lg font-semibold">
        {property.title ?? "Untitled Property"}
      </h3>
      <p className="text-sm text-gray-600">{property.location ?? "—"}</p>
      <div className="mt-2 text-sm">
        {property.pricePerNight ? `R${property.pricePerNight}/night` : "—"}
      </div>
      {property.rating != null && (
        <div className="mt-1 text-sm text-gray-700">⭐ {property.rating}</div>
      )}
    </article>
  );
}
