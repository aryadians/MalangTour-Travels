"use client";

import React, { useState } from "react";
import { Destination } from "@prisma/client";
import { createDestination, updateDestination } from "@/actions/destination";
import Link from "next/link";
import toast from "react-hot-toast";
import ImageUploader from "./ImageUploader";

interface DestinationFormProps {
  destination?: Destination;
}

export default function DestinationForm({ destination }: DestinationFormProps) {
  const isEdit = !!destination;

  // Parse JSON fields safely with helper
  const safelyParse = (
    jsonString: string | null | undefined,
    fallback: any,
  ) => {
    if (!jsonString) return fallback;
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return fallback;
    }
  };

  const initialImages = safelyParse(destination?.images, []);
  const initialFacilities = safelyParse(destination?.facilities, [""]);
  const initialHighlights = safelyParse(destination?.highlights, [""]);
  const initialItinerary = safelyParse(destination?.itinerary, [
    { time: "", activity: "" },
  ]);

  // Helper to handle dynamic inputs
  const [images, setImages] = useState<string[]>(initialImages);
  const [facilities, setFacilities] = useState<string[]>(initialFacilities);
  const [highlights, setHighlights] = useState<string[]>(initialHighlights);
  const [itinerary, setItinerary] =
    useState<{ time: string; activity: string }[]>(initialItinerary);

  const updateList = (
    setter: React.Dispatch<React.SetStateAction<any[]>>,
    index: number,
    value: any,
  ) => {
    setter((prev) => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
  };

  const addToList = (
    setter: React.Dispatch<React.SetStateAction<any[]>>,
    initialValue: any,
  ) => {
    setter((prev) => [...prev, initialValue]);
  };

  const removeFromList = (
    setter: React.Dispatch<React.SetStateAction<any[]>>,
    index: number,
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Filter out empty strings from dynamic lists
    const cleanImages = images.filter((i) => i.trim() !== "");
    const cleanFacilities = facilities.filter((i) => i.trim() !== "");
    const cleanHighlights = highlights.filter((i) => i.trim() !== "");

    // Validation
    if (cleanImages.length === 0) {
      toast.error("Please provide at least one image.");
      return;
    }

    // Append complex fields as JSON strings
    formData.set("images", JSON.stringify(cleanImages));
    formData.set("facilities", JSON.stringify(cleanFacilities));
    formData.set("highlights", JSON.stringify(cleanHighlights));
    formData.set("itinerary", JSON.stringify(itinerary));

    try {
      if (isEdit && destination) {
        const result = await updateDestination(destination.id, null, formData);
        if (result && 'message' in result && result.message.includes("Error")) {
           toast.error(result.message);
        } else {
           toast.success("Destination updated successfully!");
        }
      } else {
        const result = await createDestination(null, formData);
        if (result && 'message' in result && result.message.includes("Error")) {
           toast.error(result.message);
        } else {
           toast.success("Destination created successfully!");
        }
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-20">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={destination?.name}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              name="category"
              defaultValue={destination?.category || "Gunung"}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            >
              <option value="Gunung">Gunung</option>
              <option value="Pantai">Pantai</option>
              <option value="Kota">Kota</option>
              <option value="Budaya">Budaya</option>
              <option value="Kuliner">Kuliner</option>
              <option value="Honeymoon">Honeymoon</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={destination?.description}
              rows={4}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              defaultValue={destination?.location}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Open Time (Optional)
            </label>
            <input
              type="text"
              name="openTime"
              defaultValue={destination?.openTime || ""}
              placeholder="e.g. 08:00 - 17:00"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Price (IDR)
            </label>
            <input
              type="number"
              name="price"
              defaultValue={destination?.price}
              required
              min="0"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Ticket Price Text (Optional)
            </label>
            <input
              type="text"
              name="ticketPrice"
              defaultValue={destination?.ticketPrice || ""}
              placeholder="e.g. Rp 5.000 / person"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Rating (0-5)
            </label>
            <input
              type="number"
              name="rating"
              defaultValue={destination?.rating || 0}
              step="0.1"
              min="0"
              max="5"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Slug (URL)
            </label>
            <input
              type="text"
              name="slug"
              defaultValue={destination?.slug}
              required
              placeholder="e.g. pantai-balekambang"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <ImageUploader initialImages={images} onChange={setImages} />
      </div>

      {/* Facilities & Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Facilities
            </h3>
            <button
              type="button"
              onClick={() => addToList(setFacilities, "")}
              className="text-sm text-emerald-500 font-bold hover:underline"
            >
              + Add Facility
            </button>
          </div>
          <div className="space-y-3">
            {facilities.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) =>
                    updateList(setFacilities, idx, e.target.value)
                  }
                  placeholder="e.g. WiFi"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
                <button
                  type="button"
                  onClick={() => removeFromList(setFacilities, idx)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Highlights
            </h3>
            <button
              type="button"
              onClick={() => addToList(setHighlights, "")}
              className="text-sm text-emerald-500 font-bold hover:underline"
            >
              + Add Highlight
            </button>
          </div>
          <div className="space-y-3">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) =>
                    updateList(setHighlights, idx, e.target.value)
                  }
                  placeholder="e.g. Sunrise View"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
                <button
                  type="button"
                  onClick={() => removeFromList(setHighlights, idx)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Itinerary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            Itinerary
          </h3>
          <button
            type="button"
            onClick={() => addToList(setItinerary, { time: "", activity: "" })}
            className="text-sm text-emerald-500 font-bold hover:underline"
          >
            + Add Activity
          </button>
        </div>
        <div className="space-y-3">
          {itinerary.map((item, idx) => (
            <div key={idx} className="flex gap-2 items-start">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 flex-1">
                <input
                  type="text"
                  value={item.time}
                  onChange={(e) => {
                    const newVal = { ...item, time: e.target.value };
                    updateList(setItinerary, idx, newVal);
                  }}
                  placeholder="Time (e.g. 08:00)"
                  className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
                <input
                  type="text"
                  value={item.activity}
                  onChange={(e) => {
                    const newVal = { ...item, activity: e.target.value };
                    updateList(setItinerary, idx, newVal);
                  }}
                  placeholder="Activity Description"
                  className="md:col-span-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                />
              </div>
              <button
                type="button"
                onClick={() => removeFromList(setItinerary, idx)}
                className="text-red-500 hover:bg-red-50 p-2 rounded-lg mt-1 transition-colors"
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
        <Link
          href="/admin/destinations"
          className="px-6 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/20 transition-all transform hover:scale-105 active:scale-95"
        >
          {isEdit ? "Update Destination" : "Create Destination"}
        </button>
      </div>
    </form>
  );
}