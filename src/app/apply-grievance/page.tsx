"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneInput } from "@/components/ui/phone-input";
import { toast } from "sonner";
import { isValidPhoneNumber } from "libphonenumber-js";

// Define types for the address data
interface NominatimAddress {
  county?: string;
  city?: string;
  town?: string;
  village?: string;
  state_district?: string;
  suburb?: string;
  neighbourhood?: string;
  residential?: string;
  road?: string;
  amenity?: string;
  building?: string;
  postcode?: string;
  [key: string]: string | undefined;
}

interface NominatimResponse {
  address: NominatimAddress;
  [key: string]: unknown;
}

// Function to get address details from coordinates using OpenStreetMap Nominatim API
async function getAddressFromCoordinates(
  lat: number,
  lon: number
): Promise<NominatimResponse> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`,
      {
        headers: {
          "Accept-Language": "en",
          "User-Agent": "ResolveNow Grievance App",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch address data");
    }

    return (await response.json()) as NominatimResponse;
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error;
  }
}

// Function to parse address data from Nominatim response
function parseAddressData(addressData: NominatimResponse) {
  const address = addressData.address || {};

  return {
    // Map county to city (as per the XML example)
    city:
      address.county || address.city || address.town || address.village || "",

    // Map state_district to area (as per the XML example)
    area:
      address.state_district ||
      address.suburb ||
      address.neighbourhood ||
      address.residential ||
      "",

    // Keep other fields as they were
    landmark: address.amenity || address.building || "",
    pincode: address.postcode || "",
  };
}

export default function ApplyGrievancePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    firstName: "",
    lastName: "",
    latitude: 0,
    longitude: 0,
    city: "",
    area: "",
    landmark: "",
    pincode: "",
    workDesc: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLocating, setIsLocating] = useState(false);
  const [isFillingAddress, setIsFillingAddress] = useState(false);

  // Get location data
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLocating(true);
      setLocationError("");

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          setFormData((prev) => ({
            ...prev,
            latitude: lat,
            longitude: lon,
          }));

          // Automatically fill address after successful location detection
          try {
            setIsFillingAddress(true);
            toast.success("Location detected successfully");

            // Get address data using coordinates
            const addressData = await getAddressFromCoordinates(lat, lon);
            const parsedAddress = parseAddressData(addressData);

            setFormData((prev) => ({
              ...prev,
              ...parsedAddress,
            }));

            toast.success("Address details filled automatically");
          } catch (error) {
            console.error("Error automatically filling address:", error);
            toast.error(
              "Located you successfully, but couldn't get address details"
            );
          } finally {
            setIsFillingAddress(false);
            setIsLocating(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error(
            "Failed to get your location. Please enable location services."
          );
          setLocationError(
            "Failed to get your location. Please enable location services."
          );
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    } else {
      toast.warning("Geolocation is not supported by your browser");
      setLocationError("Geolocation is not supported by your browser");
    }
  };

  // Auto-fill address using coordinates - keep as a fallback option
  const fillAddressFromLocation = async () => {
    if (formData.latitude === 0 || formData.longitude === 0) {
      toast.warning("Please detect your location first");
      return;
    }

    try {
      setIsFillingAddress(true);
      const addressData = await getAddressFromCoordinates(
        formData.latitude,
        formData.longitude
      );

      const parsedAddress = parseAddressData(addressData);

      setFormData((prev) => ({
        ...prev,
        ...parsedAddress,
      }));

      toast.success("Address details filled automatically");
    } catch (error) {
      toast.error("Failed to get address details");
      console.error("Error filling address:", error);
    } finally {
      setIsFillingAddress(false);
    }
  };

  // Handle change for form input fields
  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for the field being edited
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, phoneNumber: value }));
    if (formErrors.phoneNumber) {
      setFormErrors((prev) => ({ ...prev, phoneNumber: "" }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Personal information validation
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!formData.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!isValidPhoneNumber(formData.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid phone number";
    }

    // Location information validation
    if (formData.latitude === 0 || formData.longitude === 0) {
      errors.location = "Location detection is required";
    }

    if (!formData.city.trim()) {
      errors.city = "City is required";
    }

    if (!formData.area.trim()) {
      errors.area = "Area is required";
    }

    if (!formData.landmark.trim()) {
      errors.landmark = "Landmark is required";
    }

    if (!formData.pincode.trim()) {
      errors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      errors.pincode = "Pincode should be 6 digits";
    }

    // Grievance description validation
    if (!formData.workDesc.trim()) {
      errors.workDesc = "Description is required";
    } else if (formData.workDesc.trim().length < 10) {
      errors.workDesc = "Description should be at least 10 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      setIsSubmitting(true);
      const submissionData = {
        ...formData,
        pincode: formData.pincode ? parseInt(formData.pincode, 10) : 0,
      };

      const response = await fetch("/api/grievances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        toast.error(
          errorData.message || "Failed to submit grievance. Please try again."
        );
        throw new Error(errorData.message || "Failed to submit grievance");
      }

      toast.success("Grievance submitted successfully!");
      router.push("/grievance-submitted");
    } catch (error) {
      toast.error("Failed to submit grievance. Please try again.");
      console.error("Error submitting grievance:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-4xl px-4 py-8 mx-auto bg-gray-50 dark:bg-stone-950">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Submit Your Grievance
      </h1>

      {locationError && (
        <div className="px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
          {locationError}
        </div>
      )}

      <div className="p-4 mb-6 border border-blue-100 rounded-lg bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
        <h2 className="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
          Location Detection
        </h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          Detecting your location helps us serve your grievance better. Click
          the button below to automatically detect your location and fill
          address details.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={getCurrentLocation}
            className="flex items-center justify-center px-4 py-2 font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={isLocating || isFillingAddress}
          >
            {isLocating || isFillingAddress ? (
              <>
                <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>
                  {isLocating
                    ? "Detecting Location..."
                    : "Getting Address Details..."}
                </span>
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span>Detect My Location</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={fillAddressFromLocation}
            className="flex items-center justify-center px-4 py-2 font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            disabled={
              isFillingAddress ||
              formData.latitude === 0 ||
              formData.longitude === 0
            }
          >
            {isFillingAddress ? (
              <>
                <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Auto-filling Address...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Auto-fill Address Details</span>
              </>
            )}
          </button>
        </div>

        {formData.latitude === 0 &&
          formData.longitude === 0 &&
          formErrors.location && (
            <div className="mt-2 text-sm text-red-600">
              {formErrors.location}
            </div>
          )}

        {formData.latitude !== 0 && formData.longitude !== 0 && (
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
            Location detected: {formData.latitude.toFixed(6)},{" "}
            {formData.longitude.toFixed(6)}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          {/* Personal Information */}
          <div className="space-y-4 md:col-span-1">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Personal Information
            </h2>

            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                First Name*
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`block w-full p-2 mt-1 bg-white border ${
                  formErrors.firstName ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm dark:bg-stone-950 dark:border-gray-700 dark:text-gray-200`}
                required
              />
              {formErrors.firstName && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.firstName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Last Name*
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`block w-full p-2 mt-1 bg-white border ${
                  formErrors.lastName ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm dark:bg-stone-950 dark:border-gray-700 dark:text-gray-200`}
                required
              />
              {formErrors.lastName && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.lastName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Phone Number*
              </label>
              <PhoneInput
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                defaultCountry="IN"
                className={`w-full ${
                  formErrors.phoneNumber ? "border-red-500" : ""
                }`}
                required
              />
              {formErrors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.phoneNumber}
                </p>
              )}
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-4 md:col-span-1">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Location Information
            </h2>
            <input type="hidden" name="latitude" value={formData.latitude} />
            <input type="hidden" name="longitude" value={formData.longitude} />

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                City*
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`block w-full p-2 mt-1 bg-white border ${
                  formErrors.city ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm dark:bg-stone-950 dark:border-gray-700 dark:text-gray-200`}
                required
              />
              {formErrors.city && (
                <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="area"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Area*
              </label>
              <input
                type="text"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className={`block w-full p-2 mt-1 bg-white border ${
                  formErrors.area ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm dark:bg-stone-950 dark:border-gray-700 dark:text-gray-200`}
                required
              />
              {formErrors.area && (
                <p className="mt-1 text-sm text-red-600">{formErrors.area}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="landmark"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Landmark*
                </label>
                <input
                  type="text"
                  id="landmark"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  className={`block w-full p-2 mt-1 bg-white border ${
                    formErrors.landmark ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm dark:bg-stone-950 dark:border-gray-700 dark:text-gray-200`}
                  required
                />
                {formErrors.landmark && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.landmark}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="pincode"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Pincode*
                </label>
                <input
                  type="text"
                  pattern="[0-9]*"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className={`block w-full p-2 mt-1 bg-white border ${
                    formErrors.pincode ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm dark:bg-stone-950 dark:border-gray-700 dark:text-gray-200`}
                  placeholder="6-digit pincode"
                  required
                />
                {formErrors.pincode && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.pincode}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Grievance Description */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Grievance Description
          </h2>

          <div>
            <label
              htmlFor="workDesc"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Please describe your issue*
            </label>
            <textarea
              id="workDesc"
              name="workDesc"
              value={formData.workDesc}
              onChange={handleChange}
              rows={5}
              className={`block w-full p-2 mt-1 bg-white border ${
                formErrors.workDesc ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm dark:bg-stone-950 dark:border-gray-700 dark:text-gray-200`}
              placeholder="Please provide details of your grievance (at least 10 characters)"
              required
            />
            {formErrors.workDesc && (
              <p className="mt-1 text-sm text-red-600">{formErrors.workDesc}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting || isLocating || isFillingAddress}
          >
            {isSubmitting ? (
              <>
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Submitting...</span>
              </>
            ) : (
              "Submit Grievance"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
