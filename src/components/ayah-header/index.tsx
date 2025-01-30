import { AyahsType } from "@/types/ayah-type";
import axios from "axios";
import { Download, Home, Type } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

interface Props {
    ayahs: AyahsType;
    setAyahsText: Dispatch<SetStateAction<string[]>>
}

export default function AyahHeader({ ayahs, setAyahsText }: Props) {
    const [textWithFormat, setTextWithFormat] = useState<boolean>(true);
    const pathname = usePathname();
    const surahNumber = pathname.split("/")[2];

    async function changeTextFormat() {
        const response = await axios.get(`https://quranapi.pages.dev/api/${surahNumber}.json`);
        const data = await response.data;
        if (!textWithFormat) {
            setAyahsText(data.arabic2);
            setTextWithFormat(true);
            toast.success( "😊 تم ازاله التشكيل بنجاح ");
        } else {
            setAyahsText(data.arabic1);
            setTextWithFormat(false);
            toast.success("😊 تم اضافه التشكيل بنجاح ");
        }
    }

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

                    <button className="p-2 hover:bg-violet-200 rounded-full transition-colors" onClick={changeTextFormat}>
                        <Type className="text-violet-400" />
                    </button>

                </div>

            </div>
        </header>
    )
}