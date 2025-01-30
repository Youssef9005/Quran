import Image from "next/image";

export default function StartOfAyah() {
    return (
        <div className="mb-12 text-center">
            <Image
                src="/assets/image.png"
                alt="بسم الله الرحمن الرحيم"
                width={480}
                height={160}
                className="mx-auto"
                priority
            />
        </div>
    )
}