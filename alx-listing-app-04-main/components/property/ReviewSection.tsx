import axios from "axios";
import { useState, useEffect } from "react";

type Review = {
  id: string | number;
  reviewerName?: string;
  rating?: number;
  comment: string;
  createdAt?: string;
};

type Props = {
  propertyId: string | number;
};

const ReviewSection = ({ propertyId }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyId) return;

    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<Review[]>(
          `/api/properties/${propertyId}/reviews`
        );
        setReviews(response.data ?? []);
      } catch (err: unknown) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  if (loading) {
    return <p className="p-2 text-gray-600">Loading reviews...</p>;
  }

  if (error) {
    return (
      <div className="rounded border border-red-300 bg-red-50 p-3 text-red-600">
        {error}
      </div>
    );
  }

  if (!reviews.length) {
    return (
      <p className="p-2 text-gray-500">
        No reviews yet. Be the first to leave feedback!
      </p>
    );
  }

  return (
    <section className="mt-6 space-y-4">
      <h2 className="text-lg font-semibold">Guest Reviews</h2>
      {reviews.map((review) => (
        <article key={review.id} className="rounded border p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-medium">
              {review.reviewerName ?? "Anonymous"}
            </span>
            {review.rating != null && (
              <span className="text-sm text-yellow-600">
                ⭐ {review.rating}
              </span>
            )}
          </div>
          <p className="mt-2 text-gray-700">{review.comment}</p>
          {review.createdAt && (
            <p className="mt-1 text-xs text-gray-500">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          )}
        </article>
      ))}
    </section>
  );
};

export default ReviewSection;
