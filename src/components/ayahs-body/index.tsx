import Image from "next/image";

interface Props {
    ayah: string;
    index: number;
}


export default function AyahsBody({ ayah, index }: Props) {

    return (
        <div className="flex flex-row-reverse items-start gap-3 group">
            <div className="flex-1">
                <p className="text-3xl leading-loose text-emerald-900 text-right">
                    {ayah}
                </p>
            </div>

            <div className="flex flex-col items-center gap-3 mt-2">
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
    );
}