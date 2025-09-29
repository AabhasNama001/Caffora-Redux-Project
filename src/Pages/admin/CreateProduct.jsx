import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { asyncCreateProducts } from "../../store/actions/productActions";

export default function CreateProduct() {
  // State to toggle between File Upload and URL Upload
  const [uploadMethod, setUploadMethod] = useState("file"); // 'file' or 'url'

  // State for URL inputs
  const [imageUrls, setImageUrls] = useState(["", ""]); // Start with two empty URLs
  const dispatch = useDispatch();
  // 1. React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors, // Added to clear errors when switching tabs
    setError,
  } = useForm();

  // State to display selected image names (Optional: for better UX)
  const [selectedFileNames, setSelectedFileNames] = useState([]);

  // 2. Form Submission Handler
  const onCreateProductHandler = (data) => {
    let finalImages = [];

    if (uploadMethod === "file") {
      // File upload logic (existing)
      const files = data.image_files;
      if (!files || files.length < 2) {
        setError("image_files", {
          type: "manual",
          message: "Please upload at least 2 images.",
        });
        return;
      }
      // In a real scenario, these files are uploaded to a server
      finalImages = Array.from(files).map((file) => file.name);
    } else {
      // URL upload logic
      const validUrls = imageUrls.filter((url) => url.trim() !== "");
      if (validUrls.length < 2) {
        setError("image_urls_error", {
          type: "manual",
          message: "Please enter at least 2 image URLs.",
        });
        return;
      }
      finalImages = validUrls;
    }

    const newProduct = {
      id: Date.now().toString(),
      title: data.title,
      price: Number(data.price),
      description: data.description,
      category: data.category,
      image: finalImages, // Final array of names or URLs
    };
    dispatch(asyncCreateProducts(newProduct));
    console.log("Product Object Created:", newProduct);

    toast.success(`Product "${data.title}" created successfully!`);
    reset();
    setSelectedFileNames([]);
    setImageUrls(["", ""]); // Reset URLs
    clearErrors();
  };

  // Handler for file selection change
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFileNames(files.map((file) => file.name));
    clearErrors("image_files");
  };

  // Handler for URL input change
  const handleUrlChange = (index, value) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
    clearErrors("image_urls_error");
  };

  // Tab switching logic
  const handleTabChange = (method) => {
    setUploadMethod(method);
    clearErrors(); // Clear all form errors when switching tabs
    setSelectedFileNames([]); // Clear file names
    reset({
      // Reset file input value specifically
      image_files: null,
    });
  };

  return (
    <div className="min-h-screen bg-[#F4E7CF] p-4 md:p-8 flex items-center justify-center relative z-20">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-3xl my-30">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#e57c23] mb-6 border-b-2 border-[#e57c23] pb-2">
          Create New Product
        </h2>

        <form
          onSubmit={handleSubmit(onCreateProductHandler)}
          className="space-y-6"
        >
          {/* 1. Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-black text-gray-700 mb-1"
            >
              Product Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="e.g., Authentic South Indian Kaapi"
              {...register("title", { required: "Title is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e57c23]"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* 2. Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-black text-gray-700 mb-1"
            >
              Price (in ₹)
            </label>
            <input
              type="number"
              id="price"
              placeholder="e.g., 450"
              step="0.01"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
                min: { value: 1, message: "Price must be greater than 0" },
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e57c23]"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* 3. Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-black text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              {...register("category", { required: "Category is required" })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e57c23] bg-white"
            >
              <option value="">Select Category</option>
              <option value="beans">☕ Coffee Beans</option>
              <option value="instaPour">💧 Insta Pour</option>
              <option value="equipments">⚙️ Equipments</option>
              <option value="coffee">🥤 Coffees</option>
              <option value="mugs-and-glasses">🥛 Glasses & Mugs</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* 4. Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-black text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              placeholder="Premium South Indian filter coffee beans..."
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e57c23]"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* 5. Image Upload Section (File OR URL) */}
          <div className="border border-gray-300 p-4 rounded-lg">
            <label className="block text-sm font-black text-gray-700 mb-3">
              Product Images (2 Images only)
            </label>

            {/* Tab Headers */}
            <div className="flex mb-4 border-b">
              <button
                type="button"
                onClick={() => handleTabChange("file")}
                className={`px-4 py-2 text-sm font-black ${
                  uploadMethod === "file"
                    ? "border-b-2 border-[#e57c23] text-[#e57c23]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Upload Files
              </button>
              <button
                type="button"
                onClick={() => handleTabChange("url")}
                className={`px-4 py-2 text-sm font-black ${
                  uploadMethod === "url"
                    ? "border-b-2 border-[#e57c23] text-[#e57c23]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Use Image URL
              </button>
            </div>

            {/* File Upload Content */}
            {uploadMethod === "file" && (
              <>
                <input
                  type="file"
                  id="image_files"
                  multiple
                  accept="image/*"
                  // Use a different name for file input to separate from URL logic
                  {...register("image_files", {
                    required: "Please upload images, or switch to URL tab.",
                    validate: {
                      minFiles: (value) =>
                        (value && value.length == 2) ||
                        "Please upload 2 images only",
                    },
                  })}
                  onChange={(e) => {
                    register("image_files").onChange(e);
                    handleFileChange(e);
                  }}
                  className="w-full block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
                />
                {errors.image_files && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.image_files.message}
                  </p>
                )}

                {/* Selected Files Preview */}
                {selectedFileNames.length > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p className="font-semibold">Selected Files:</p>
                    <ul className="list-disc list-inside ml-2">
                      {selectedFileNames.map((name, index) => (
                        <li key={index}>{name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}

            {/* URL Upload Content */}
            {uploadMethod === "url" && (
              <>
                {imageUrls.map((url, index) => (
                  <div key={index} className="mb-3">
                    <label
                      htmlFor={`url-${index}`}
                      className="block text-xs font-medium text-gray-500 mb-1"
                    >
                      Image URL {index + 1}
                    </label>
                    <input
                      type="url"
                      id={`url-${index}`}
                      placeholder="https://example.com/image.jpg"
                      value={url}
                      onChange={(e) => handleUrlChange(index, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#e57c23] text-sm"
                    />
                  </div>
                ))}

                <div className="flex justify-between items-center mt-4">
                  <p className="text-xs text-gray-500">
                    Current URLs:{" "}
                    {imageUrls.filter((url) => url.trim() !== "").length} (2
                    only)
                  </p>
                </div>
                {errors.image_urls_error && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.image_urls_error.message}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#e57c23] text-white font-black py-3 rounded-lg hover:bg-[#cf6d1f] transition duration-300 shadow-md"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}
