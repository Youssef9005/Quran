import { AyahsType } from "@/types/ayah-type";
import { Download, Home } from "lucide-react";
import Link from "next/link";

interface Props {
    ayahs: AyahsType;
}

export default function AyahHeader({ayahs} : Props) {
    return (
        <header className="bg-white sticky top-0 z-10 shadow-sm">
            <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="flex items-center justify-between">

                    <div className="flex-1">
                        <h1 className="text-3xl font-arabic text-center text-emerald-800">
                            {ayahs.surahNameArabicLong}
                        </h1>
                        <p className="text-sm text-gray-600 text-center mt-2">
                            {ayahs.surahNameTranslation} • {ayahs.totalAyah} آيات
                        </p>
                    </div>


                    <Link
                        href={ayahs.audio[1].originalUrl}
                        className="p-2 hover:bg-emerald-50 rounded-full transition-colors"
                        title="Download Surah"
                    >
                        <Download className="text-green-300" />
                    </Link>

                    <Link
                        href={"/"}
                        className="p-2 hover:bg-blue-50 rounded-full transition-colors"
                        title="Home"
                    >
                        <Home className="text-blue-500" />
                    </Link>
                </div>
            </div>
        </header>
    )
}