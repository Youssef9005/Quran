import Image from "next/image";

export default function MainHeader() {
    return (
        <header className="w-full p-2 shadow-md flex items-center justify-center">
            <Image src={"/assets/quran-kareem.png"} alt="Quran Kareem Logo" width={150} height={150} />
        </header>
    )
}