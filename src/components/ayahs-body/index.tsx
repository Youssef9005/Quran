/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from "react";
import Image from "next/image";
import { Mic, MicOff } from "lucide-react";

interface Props {
    ayah: string;
    index: number;
}

const normalizeText = (text: string) => {
    return text
        .replace(/[\u064b-\u065f\u0670]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
};

export default function AyahsBody({ ayah, index }: Props) {
    const [isRecording, setIsRecording] = useState(false);
    const [result, setResult] = useState<{ correct: boolean; message: string } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const recognitionRef = useRef<any>(null);

    const startRecording = () => {
        const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setError('المتصفح غير مدعوم للتعرف على الصوت');
            return;
        }

        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.lang = 'ar-SA';
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;

        recognitionRef.current.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            const cleanTranscript = normalizeText(transcript);
            const cleanAyah = normalizeText(ayah);

            const isCorrect = cleanTranscript === cleanAyah;
            setResult({
                correct: isCorrect,
                message: isCorrect ? 'التلاوة صحيحة 👏' : 'يوجد خطأ في التلاوة ❌'
            });
            setIsRecording(false);
        };

        recognitionRef.current.onerror = (event: any) => {
            setError('حدث خطأ في التعرف على الصوت: ' + event.error);
            setIsRecording(false);
        };

        recognitionRef.current.onend = () => {
            setIsRecording(false);
        };

        try {
            recognitionRef.current.start();
            setIsRecording(true);
            setResult(null);
            setError(null);
        } catch (err) {
            console.log(err);
            setError('يُرجى السماح باستخدام الميكروفون أولاً');
            setIsRecording(false);
        }
    };

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsRecording(false);
    };

    return (
        <div className="flex flex-row-reverse items-start gap-3 group">
            <div className="flex-1">
                <p className="text-3xl leading-loose text-emerald-900 text-right">
                    {ayah}
                </p>

                {result && (
                    <div className={`mt-2 text-sm p-2 rounded ${result.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {result.message}
                    </div>
                )}

                {error && (
                    <div className="mt-2 text-sm text-red-600">
                        {error}
                    </div>
                )}
            </div>

            <div className="flex flex-col items-center gap-3 mt-2">
                <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`p-2 rounded-full transition-all ${isRecording
                        ? 'bg-green-100 hover:bg-red-200 text-green-400 animate-pulse'
                        : 'bg-red-100 hover:bg-gray-200 text-red-400'
                        }`}
                    title={isRecording ? "إيقاف التسجيل" : "بدء التسجيل"}
                >
                    {isRecording ? <Mic /> : <MicOff />}
                </button>

                <div className="relative w-8 h-8 flex items-center justify-center">
                    <Image
                        src="/assets/ayah-number.png"
                        alt="رقم الآية"
                        width={32}
                        height={32}
                        className="opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <span className="absolute text-xs font-medium text-emerald-900">
                        {index + 1}
                    </span>
                </div>
            </div>
        </div>
    )
}