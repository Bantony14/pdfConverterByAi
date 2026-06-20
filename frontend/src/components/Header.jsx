import { FileText, Download } from "lucide-react";

function Header() {
    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
                                <span className="text-white font-extrabold text-xl tracking-wide">
                                    BS
                                </span>
                            </div>
                        </div>

                        <div>
                            <h1 className="font-black text-xl text-slate-900">
                                Bantony's PDF Converter
                            </h1>

                            <p className="text-xs text-slate-500">
                                Fast • Secure • Free
                            </p>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="hidden md:flex items-center gap-3">
                        <div className="px-4 py-2 rounded-xl bg-blue-50 text-blue-700 text-sm font-medium">
                            Image → PDF
                        </div>


                    </div>

                </div>
            </div>
        </header>
    );
}

export default Header;