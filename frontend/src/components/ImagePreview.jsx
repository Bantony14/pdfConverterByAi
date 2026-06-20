import {
    DragDropContext,
    Droppable,
    Draggable,
} from "@hello-pangea/dnd";

import ImageCard from "./ImageCard";

function ImagePreview({ images, setImages }) {
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const items = [...images];

        const [reorderedItem] = items.splice(
            result.source.index,
            1
        );

        items.splice(
            result.destination.index,
            0,
            reorderedItem
        );

        setImages(items);
    };

    if (images.length === 0) {
        return (
            <div className="bg-white rounded-lg p-10 text-center mb-6 shadow">
                <h2 className="text-xl font-semibold">
                    No Images Selected
                </h2>

                <p className="text-gray-500 mt-2">
                    Upload images to start converting.
                </p>
            </div>
        );
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="images">
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-4
                        xl:grid-cols-5
                        gap-5
                        mb-8
                    "
                    >
                        {images.map((image, index) => (
                            <Draggable
                                key={`${image.name}-${index}`}
                                draggableId={`${image.name}-${index}`}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`
                                        transition-all
                                        duration-200
                                        ${snapshot.isDragging
                                                ? "scale-105 rotate-1 z-50"
                                                : ""
                                            }
                                    `}
                                    >
                                        <ImageCard
                                            image={image}
                                            index={index}
                                            images={images}
                                            setImages={setImages}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default ImagePreview;