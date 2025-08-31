import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Simple validation check
  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      return "Please fill in all required fields.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "Please enter a valid email address.";
    }
    if (formData.cardNumber.length < 12) {
      return "Invalid card number.";
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/bookings", formData);
      setSuccess("🎉 Booking confirmed! A confirmation email has been sent.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        billingAddress: "",
      });
    } catch (err: unknown) {
      setError("❌ Failed to submit booking. Please try again.");
      console.error("Booking error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-lg rounded-lg border p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">Complete Your Booking</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields */}
        <div className="flex gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-1/2 rounded border p-2"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-1/2 rounded border p-2"
            required
          />
        </div>

        {/* Email & Phone */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded border p-2"
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />

        {/* Payment Fields */}
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={formData.cardNumber}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        <div className="flex gap-4">
          <input
            type="text"
            name="expirationDate"
            placeholder="MM/YY"
            value={formData.expirationDate}
            onChange={handleChange}
            className="w-1/2 rounded border p-2"
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleChange}
            className="w-1/2 rounded border p-2"
          />
        </div>

        {/* Billing */}
        <input
          type="text"
          name="billingAddress"
          placeholder="Billing Address"
          value={formData.billingAddress}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-black py-2 text-white"
        >
          {loading ? "Processing..." : "Confirm & Pay"}
        </button>

        {/* Feedback */}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}
      </form>
    </section>
  );
}
