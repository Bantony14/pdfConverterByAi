import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import toast from "react-hot-toast";

function UploadZone({ setImages }) {
    const onDrop = (acceptedFiles) => {
        setImages((prev) => {
            const updatedImages = [...prev, ...acceptedFiles];

            if (updatedImages.length > 100) {
                toast.error("Maximum 100 images allowed");
                return prev;
            }

            return updatedImages;
        });

        toast.success(
            `${acceptedFiles.length} image(s) added successfully`
        );
    };

    const { getRootProps, getInputProps, isDragActive } =
        useDropzone({
            accept: {
                "image/jpeg": [],
                "image/png": [],
                "image/webp": [],
            },
            multiple: true,
            onDrop,
        });

    return (
        <div
            {...getRootProps()}
            className={`
                mb-10
                rounded-2xl
                border-2
                border-dashed
                transition-all
                duration-200
                cursor-pointer
                bg-white
                ${isDragActive
                    ? "border-indigo-500 bg-indigo-50 scale-[1.005]"
                    : "border-slate-200 hover:border-indigo-400 hover:bg-slate-50"
                }
            `}
        >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center justify-center py-12 px-6 text-center">

                {/* Icon */}
                <div
                    className={`
                        h-16 w-16
                        rounded-2xl
                        flex items-center justify-center
                        transition-all duration-200
                        ${isDragActive
                            ? "bg-indigo-100 text-indigo-600"
                            : "bg-slate-100 text-slate-400"
                        }
                    `}
                >
                    <UploadCloud size={32} />
                </div>

                {/* Heading */}
                <h2 className="mt-5 text-lg font-semibold text-slate-700">
                    {isDragActive
                        ? "Drop Images Here"
                        : "Drag & Drop Images Here"}
                </h2>

                {/* Sub hint */}
                <p className="mt-1.5 text-sm text-slate-400">
                    or{" "}
                    <span className="text-indigo-500 font-medium">
                        click to browse
                    </span>{" "}
                    from your device
                </p>

                {/* Divider */}
                <div className="mt-6 flex items-center gap-3 w-full max-w-xs">
                    <div className="flex-1 h-px bg-slate-100" />
                    <span className="text-xs text-slate-300 font-medium tracking-widest">
                        SUPPORTS
                    </span>
                    <div className="flex-1 h-px bg-slate-100" />
                </div>

                {/* Format pills */}
                <div className="mt-4 flex gap-2 flex-wrap justify-center">
                    <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold tracking-wide">
                        JPG
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold tracking-wide">
                        PNG
                    </span>
                    <span className="px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-xs font-semibold tracking-wide">
                        WEBP
                    </span>
                </div>

                {/* Limit note */}
                <p className="mt-4 text-xs text-slate-300">
                    Maximum 100 images per upload
                </p>
            </div>
        </div>
    );
}

export default UploadZone;