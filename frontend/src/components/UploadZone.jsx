import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
    UploadCloud,
    ImageIcon,
    X,
    Trash2,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

/* ─── helpers ─────────────────────────────────────────────── */
function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/* ─── Toast helpers ────────────────────────────────────────── */
const notify = {
    success: (msg) =>
        toast.custom(
            <div className="flex items-center gap-2 bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-sm text-slate-700">
                <CheckCircle size={16} className="text-emerald-600 flex-shrink-0" />
                <span>{msg}</span>
            </div>
        ),
    error: (msg) =>
        toast.custom(
            <div className="flex items-center gap-2 bg-white border border-slate-200 shadow-sm rounded-xl px-4 py-3 text-sm text-slate-700">
                <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                <span>{msg}</span>
            </div>
        ),
};

/* ─── File item row ────────────────────────────────────────── */
function FileItem({ file, onRemove, disabled }) {
    const previewUrl = URL.createObjectURL(file);
    return (
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-slate-100 bg-slate-50 hover:border-slate-200 transition-colors group">
            {/* Thumbnail */}
            <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200 bg-white">
                <img
                    src={previewUrl}
                    alt=""
                    className="w-full h-full object-cover"
                    onLoad={() => URL.revokeObjectURL(previewUrl)}
                />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate leading-tight">
                    {file.name}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{formatSize(file.size)}</p>
            </div>

            {/* Remove */}
            <button
                type="button"
                onClick={onRemove}
                disabled={disabled}
                aria-label={`Remove ${file.name}`}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
                <X size={15} />
            </button>
        </div>
    );
}

/* ─── Main component ───────────────────────────────────────── */
function UploadZone({ onUpload }) {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    /* ── Drop handler ── */
    const onDrop = useCallback(
        (accepted, rejected) => {
            if (accepted.length) {
                setFiles((prev) => {
                    const deduplicated = accepted.filter(
                        (f) =>
                            !prev.find(
                                (p) => p.name === f.name && p.size === f.size
                            )
                    );
                    return [...prev, ...deduplicated];
                });
                notify.success(
                    `${accepted.length} image${accepted.length > 1 ? "s" : ""} added`
                );
            }
            if (rejected.length) {
                notify.error(
                    `${rejected.length} unsupported file${rejected.length > 1 ? "s" : ""} skipped`
                );
            }
        },
        []
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "image/jpeg": [], "image/png": [], "image/webp": [] },
        multiple: true,
        onDrop,
        disabled: uploading,
    });

    /* ── Remove single file ── */
    const removeFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
        if (files.length === 1) notify.error("File removed");
    };

    /* ── Simulated upload (replace with your real API call) ── */
    const handleUpload = async () => {
        if (!files.length || uploading) return;
        setUploading(true);
        setProgress(0);

        // Replace this simulation with:
        //   const formData = new FormData();
        //   files.forEach(f => formData.append("images", f));
        //   await axios.post("/api/upload", formData, {
        //     onUploadProgress: (e) => setProgress(Math.round(e.loaded * 100 / e.total))
        //   });
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return Math.min(prev + Math.random() * 18 + 4, 100);
            });
        }, 120);

        await new Promise((r) => setTimeout(r, 1800));
        clearInterval(interval);
        setProgress(100);

        await new Promise((r) => setTimeout(r, 300));

        const count = files.length;
        if (onUpload) onUpload(files);
        setFiles([]);
        setProgress(0);
        setUploading(false);
        notify.success(`${count} image${count > 1 ? "s" : ""} uploaded successfully`);
    };

    const clearAll = () => {
        setFiles([]);
        notify.error("All files removed");
    };

    return (
        <div className="w-full max-w-lg mx-auto flex flex-col gap-4">
            {/* Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col gap-4">

                {/* Header */}
                <div>
                    <h2 className="text-base font-semibold text-slate-800">
                        Upload images
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                        JPG, PNG, and WEBP supported · Multiple files allowed
                    </p>
                </div>

                {/* Dropzone */}
                <div
                    {...getRootProps()}
                    className={`
                        relative flex flex-col items-center justify-center gap-3
                        rounded-xl border-2 border-dashed px-6 py-10
                        cursor-pointer transition-all duration-200 text-center
                        ${isDragActive
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-slate-200 bg-slate-50 hover:border-indigo-400 hover:bg-slate-100"
                        }
                        ${uploading ? "pointer-events-none opacity-50" : ""}
                    `}
                >
                    <input {...getInputProps()} />

                    {/* Icon */}
                    <div
                        className={`
                            w-12 h-12 rounded-xl flex items-center justify-center
                            border transition-all duration-200
                            ${isDragActive
                                ? "bg-indigo-100 border-indigo-300 text-indigo-600"
                                : "bg-white border-slate-200 text-slate-400"
                            }
                        `}
                    >
                        {isDragActive ? (
                            <UploadCloud size={24} />
                        ) : (
                            <ImageIcon size={24} />
                        )}
                    </div>

                    <div>
                        <p className="text-sm font-medium text-slate-700">
                            {isDragActive
                                ? "Release to add images"
                                : "Drop images here"}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                            or{" "}
                            <span className="text-indigo-600 font-medium">
                                click to browse
                            </span>{" "}
                            from your device
                        </p>
                    </div>

                    {/* Format pills */}
                    <div className="flex gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                            JPG
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                            PNG
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-700">
                            WEBP
                        </span>
                    </div>
                </div>

                {/* File list */}
                {files.length > 0 && (
                    <>
                        <div className="h-px bg-slate-100" />

                        <div className="flex flex-col gap-2">
                            {/* List header */}
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-slate-500">
                                    Selected files
                                </span>
                                <span className="text-xs text-slate-400 bg-slate-100 rounded-full px-2.5 py-0.5">
                                    {files.length}{" "}
                                    {files.length === 1 ? "file" : "files"}
                                </span>
                            </div>

                            {/* Items */}
                            <div className="flex flex-col gap-1.5 max-h-56 overflow-y-auto pr-0.5 scrollbar-thin">
                                {files.map((file, i) => (
                                    <FileItem
                                        key={`${file.name}-${file.size}-${i}`}
                                        file={file}
                                        onRemove={() => removeFile(i)}
                                        disabled={uploading}
                                    />
                                ))}
                            </div>

                            {/* Progress bar */}
                            {uploading && (
                                <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                                        style={{ width: `${Math.round(progress)}%` }}
                                    />
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-2 mt-1">
                                <button
                                    type="button"
                                    onClick={clearAll}
                                    disabled={uploading}
                                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <Trash2 size={14} />
                                    Clear all
                                </button>
                                <button
                                    type="button"
                                    onClick={handleUpload}
                                    disabled={uploading || files.length === 0}
                                    className="flex-[2] flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-sm text-white font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <UploadCloud size={15} />
                                    {uploading
                                        ? `Uploading… ${Math.round(progress)}%`
                                        : "Upload files"}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default UploadZone;