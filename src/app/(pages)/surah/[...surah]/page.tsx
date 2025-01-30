"use client";
import AyahHeader from "@/components/ayah-header";
import AyahsBody from "@/components/ayahs-body";
import StartOfAyah from "@/components/start-of-ayah";
import { AyahsType } from "@/types/ayah-type";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SurahPage() {
    const [ayahs, setAyahs] = useState<AyahsType | null>(null);
    const [ayahsText, setAyahsText] = useState<string[]>([]);
    const pathname = usePathname();
    const surahNumber = pathname.split("/")[2];

    useEffect(() => {
        async function getAyahs() {
            const response = await axios.get(`https://quranapi.pages.dev/api/${surahNumber}.json`);
            const data = await response.data;
            setAyahs(data);
            setAyahsText(data.arabic2);
        }
        getAyahs();
    }, [surahNumber]);

    return (
        <main className="bg-gray-50 min-h-screen">
            {ayahs && (
                <>
                    <AyahHeader
                        ayahs={ayahs}
                        setAyahsText={setAyahsText}
                    />

                    <div className="max-w-2xl mx-auto px-4 py-8">
                        <StartOfAyah />

                        <div className="space-y-8">
                            {ayahsText.map((ayah, index) => (
                                <AyahsBody key={index} ayah={ayah} index={index} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}