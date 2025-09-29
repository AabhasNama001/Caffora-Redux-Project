import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { asyncUpdateProducts } from "../../store/actions/productActions";

// --- ADDED CODE START ---

// 🎯 Path Mapping: Yeh map product category ke hisaab se uska public folder path batata hai.
const IMAGE_FOLDER_MAP = {
    'beans': '/CoffeeBeans/',
    'instaPour': '/InstaPour/',
    'equipments': '/Equipments/',
    'coffee': '/Coffees/',
    'mugs-and-glasses': '/Glasses&Mugs/',
    // Add any other category mappings here if needed
};

// --- ADDED CODE END ---


// Assume this component receives a 'product' prop, which is the product to be updated.
export default function UpdateProduct({ product }) {
    const dispatch = useDispatch();

    // Determine the initial upload method based on the existing image data
    const initialUploadMethod = product?.image?.every((url) =>
        url?.startsWith("http") // Added safe chaining (?)
    )
        ? "url"
        : "file";

    const [uploadMethod, setUploadMethod] = useState(initialUploadMethod);
    const [imageUrls, setImageUrls] = useState(() => {
        if (initialUploadMethod === "url") {
            // Pre-populate with existing URLs
            return product.image;
        }
        return ["", ""]; // Default to empty for file upload
    });

    const [selectedFileNames, setSelectedFileNames] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        clearErrors,
        setError,
    } = useForm({
        defaultValues: {
            title: product?.title || "",
            price: product?.price || "",
            category: product?.category || "",
            description: product?.description || "",
            image_urls: product?.image || ["", ""], // Pre-populate for URL tab
            image_files: null, // Keep this null initially
        },
    });

    // 2. Update the form with new product data if the prop changes
    useEffect(() => {
        if (product) {
            reset({
                title: product.title,
                price: product.price,
                category: product.category,
                description: product.description,
                // Only reset the URL field if we're in URL mode
                image_urls: initialUploadMethod === "url" ? product.image : ["", ""],
            });
            setImageUrls(initialUploadMethod === "url" ? product.image : ["", ""]);
            setSelectedFileNames([]);
            setUploadMethod(initialUploadMethod);
        }
    }, [product, reset, initialUploadMethod]);

    // 3. Form Submission Handler for UPDATE
    const onUpdateProductHandler = (data) => {
        let finalImages = [];
        let newFilesUploaded = false; // Track if new files were selected

        if (uploadMethod === "file") {
            const files = data.image_files;
            
            if (files && files.length > 0) {
                // If new files are uploaded, get their names
                if (files.length !== 2) {
                    setError("image_files", {
                        type: "manual",
                        message: "Please upload exactly 2 images.",
                    });
                    return;
                }
                
                // --- DYNAMIC PATH GENERATION LOGIC ---
                
                // 1. Get the folder path based on the selected category
                const imageFolder = IMAGE_FOLDER_MAP[data.category] || '/'; // Fallback to root if category is missing
                
                // 2. Construct the full path for each file and save it
                finalImages = Array.from(files).map((file) => imageFolder + file.name);
                
                // --- END DYNAMIC PATH GENERATION ---
                newFilesUploaded = true;
                
            } else {
                // If no new files, retain old image data (from the product prop). 
                // Note: The retained data is already in the correct full path format.
                finalImages = product.image;
            }
        } else {
            // URL method
            const validUrls = imageUrls.filter((url) => url.trim() !== "");
            if (validUrls.length !== 2) {
                setError("image_urls_error", {
                    type: "manual",
                    message: "Please enter exactly 2 image URLs.",
                });
                return;
            }
            finalImages = validUrls;
        }

        // Final object to be sent to the backend
        const updatedProduct = {
            id: product.id, // Keep the existing ID
            title: data.title,
            price: Number(data.price),
            description: data.description,
            category: data.category,
            image: finalImages, // Now contains full paths (/Folder/filename.jpg or full URL)
        };

        // Dispatch the update action
        dispatch(asyncUpdateProducts(product.id, updatedProduct));

        toast.success(`Product "${data.title}" updated successfully!`);
        // We don't reset the form completely after an update to allow for further edits
    };

    // Handler for file selection change (Remains the same)
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFileNames(files.map((file) => file.name));
        clearErrors("image_files");
    };

    // Handler for URL input change (Remains the same)
    const handleUrlChange = (index, value) => {
        const newUrls = [...imageUrls];
        newUrls[index] = value;
        setImageUrls(newUrls);
        clearErrors("image_urls_error");
    };

    // Tab switching logic (Modified for update)
    const handleTabChange = (method) => {
        setUploadMethod(method);
        clearErrors();
        setSelectedFileNames([]);

        if (method === "url" && product?.image?.length > 0) {
            // Filter to only show full URLs if in URL mode
            setImageUrls(product.image.filter((url) => url?.startsWith("http"))); 
        } else if (method === "file" && product?.image?.length > 0) {
            // For file mode, we show existing paths (which may be relative)
            setImageUrls(product.image.filter((url) => !url?.startsWith("http"))); 
        } else {
            setImageUrls(["", ""]);
        }
    };

    // Render the form
    return (
        <div className="min-h-screen bg-[#FCF7E6] p-4 md:px-4 md:pt-14 flex items-center justify-center relative z-20">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-[90vw] sm:w-[590px] md:w-[700px] lg:w-full max-w-4xl">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#e57c23] mb-6 border-b-2 border-[#e57c23] pb-2">
                    Update Product
                </h2>

                <form
                    onSubmit={handleSubmit(onUpdateProductHandler)}
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

                        {/* Current Images Preview */}
                        {product?.image?.length > 0 && (
                            <div className="mb-4">
                                <p className="text-sm font-semibold text-gray-700 mb-2">
                                    Current Images:
                                </p>
                                <div className="flex space-x-2 overflow-x-auto">
                                    {product.image.map((imgSrc, index) => (
                                        <img
                                            key={index}
                                            src={imgSrc}
                                            alt={`Current Product Image ${index + 1}`}
                                            className="w-20 h-20 object-cover rounded-md border border-gray-300"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* File Upload Content */}
                        {uploadMethod === "file" && (
                            <>
                                <input
                                    type="file"
                                    id="image_files"
                                    multiple
                                    accept="image/*"
                                    {...register("image_files", {
                                        validate: {
                                            minFiles: (value) => {
                                                if (value && value.length > 0 && value.length !== 2) {
                                                    return "Please upload exactly 2 images.";
                                                }
                                                return true;
                                            },
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

                                {selectedFileNames.length > 0 && (
                                    <div className="mt-2 text-sm text-gray-600">
                                        <p className="font-semibold">New Selected Files:</p>
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
                                            className="block text-xs font-black text-gray-500 mb-1"
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
                        Update Product
                    </button>
                </form>
            </div>
        </div>
    );
}