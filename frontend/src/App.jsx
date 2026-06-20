import { FileText, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import UploadZone from "./components/UploadZone";
import ImagePreview from "./components/ImagePreview";
import ConvertButton from "./components/ConvertButton";
import Header from "./components/Header";

function App() {
  const [images, setImages] = useState([]);

  const totalSize = (
    images.reduce((acc, file) => acc + file.size, 0) /
    1024 /
    1024
  ).toFixed(2);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-8">
            <div className="flex items-center gap-5">
              <div className="flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg">
                <FileText className="text-white" size={38} />
              </div>

              <div>
                <h1 className="text-4xl font-extrabold text-slate-900">
                  Image to PDF Converter
                </h1>

                <p className="text-slate-500 mt-2 text-lg">
                  Upload multiple images and convert them into a PDF.
                </p>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-4 md:p-6 mb-8">
            <UploadZone
              images={images}
              setImages={setImages}
            />
          </div>

          {images.length > 0 && (
            <>
              {/* Toolbar */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                    <Sparkles
                      className="text-blue-600"
                      size={24}
                    />
                  </div>

                  <div>
                    <h2 className="font-bold text-xl">
                      {images.length} Pages Ready
                    </h2>

                    <p className="text-slate-500 text-sm">
                      Drag & drop to reorder PDF pages
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setImages([])}
                  className="
                                flex
                                items-center
                                gap-2
                                px-5
                                py-3
                                rounded-xl
                                bg-red-50
                                text-red-600
                                hover:bg-red-100
                                transition-all
                            "
                >
                  <Trash2 size={18} />
                  Clear All
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <p className="text-slate-500 text-sm">
                    Total Images
                  </p>

                  <h3 className="text-4xl font-black mt-2">
                    {images.length}
                  </h3>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <p className="text-slate-500 text-sm">
                    Estimated Pages
                  </p>

                  <h3 className="text-4xl font-black mt-2">
                    {images.length}
                  </h3>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                  <p className="text-slate-500 text-sm">
                    Total Size
                  </p>

                  <h3 className="text-4xl font-black mt-2">
                    {totalSize} MB
                  </h3>
                </div>

              </div>

              {/* Preview */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-8">
                <ImagePreview
                  images={images}
                  setImages={setImages}
                />
              </div>

              {/* Convert Button */}
              <div className="sticky bottom-4 z-20">
                <ConvertButton images={images} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;