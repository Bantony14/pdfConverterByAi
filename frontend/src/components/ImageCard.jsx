import { Trash2, GripVertical, ImageIcon } from "lucide-react";

function ImageCard({
    image,
    index,
    images,
    setImages,
}) {
    const removeImage = () => {
        const updatedImages = images.filter(
            (_, i) => i !== index
        );

        setImages(updatedImages);
    };

    const fileSize = (
        image.size /
        1024 /
        1024
    ).toFixed(2);

    return (
        <div
            className="
                group
                bg-white
                rounded-3xl
                overflow-hidden
                border
                border-slate-200
                shadow-sm
                hover:shadow-2xl
                hover:-translate-y-1
                transition-all
                duration-300
            "
        >
            <div className="relative">
                <img
                    src={URL.createObjectURL(image)}
                    alt={image.name}
                    className="
                        w-full
                        h-56
                        object-cover
                    "
                />

                {/* Page Number */}
                <div
                    className="
                        absolute
                        top-3
                        left-3
                        bg-white/90
                        backdrop-blur
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-bold
                        shadow
                    "
                >
                    Page {index + 1}
                </div>

                {/* Drag Indicator */}
                <div
                    className="
                        absolute
                        top-3
                        right-3
                        bg-white/90
                        backdrop-blur
                        p-2
                        rounded-full
                        shadow
                    "
                >
                    <GripVertical size={16} />
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-start gap-2">
                    <ImageIcon
                        size={18}
                        className="mt-0.5 text-slate-500"
                    />

                    <div className="flex-1 min-w-0">
                        <h3
                            className="
                                font-semibold
                                text-slate-800
                                truncate
                            "
                        >
                            {image.name}
                        </h3>

                        <p
                            className="
                                text-sm
                                text-slate-500
                                mt-1
                            "
                        >
                            {fileSize} MB
                        </p>
                    </div>
                </div>

                <button
                    onClick={removeImage}
                    className="
                        mt-4
                        w-full
                        flex
                        items-center
                        justify-center
                        gap-2
                        py-2.5
                        rounded-xl
                        border
                        border-red-200
                        text-red-600
                        hover:bg-red-50
                        transition-all
                    "
                >
                    <Trash2 size={16} />
                    Remove
                </button>
            </div>
        </div>
    );
}

export default ImageCard;