import { SurahType } from "@/types/surah-type"
import Link from "next/link";

interface Props {
    surah: SurahType[];
}

export default function SurahItem({ surah }: Props) {
    return (
        <div className="w-full h-screen grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-2">
            {surah.map((surah, index) => (
                <Link key={surah.surahName} href={`/surah/${index + 1}`}>
                    <div className="min-h-32 max-h-32 p-2 bg-white rounded-md shadow-xl border border-gray-200 flex items-center gap-x-3 hover:border-gray-400">

                        {/* Number Of Surah */}
                        <div className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-md -rotate-45 shadow-xl">
                            <span className="text-white font-semibold rotate-45">{index + 1}</span>
                        </div>

                        <div className="flex-1 flex items-center justify-between">

                            {/* Surah Name English */}
                            <div className="flex flex-col text-left">
                                <h1 className="font-semibold">{surah.surahName}</h1>
                                <span className="font-semibold text-xs text-gray-600">{surah.surahNameTranslation}</span>
                            </div>

                            {/* Surah Name Arabic */}
                            <div className="flex flex-col text-center">
                                <h1 className="font-semibold text-sm">{surah.surahNameArabicLong}</h1>
                                <span className="font-semibold text-xs text-gray-600">{surah.totalAyah} Ayahs</span>
                            </div>

                        </div>

                    </div>
                </Link>
            ))}

            <div className="w-full p-16 xl:p-[135px]">

            </div>
        </div>
    )
}