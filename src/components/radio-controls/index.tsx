import { RadioType } from "@/types/radio-type";
import { AudioLines, Pause, PlayIcon, StepBack, StepForward } from "lucide-react";
import { Dispatch, RefObject, SetStateAction } from "react";

interface Props {
    radio: RadioType[] | null;
    currentChannel: number;
    setRadioPlay: Dispatch<SetStateAction<boolean>>;
    setCurrentChannel: Dispatch<SetStateAction<number>>;
    radioPlay: boolean;
    audioRef: RefObject<HTMLAudioElement | null>;
}

export default function RadioController({ radio, currentChannel, radioPlay, audioRef, setRadioPlay, setCurrentChannel }: Props) {

    function handlePlayRadio() {
        setRadioPlay(true);
        audioRef.current?.play();
    }

    function handlePauseRadio() {
        setRadioPlay(false);
        audioRef.current?.pause();
    }

    function handleNextStep() {
        if (!radio) return;

        if (currentChannel <= radio.length && audioRef.current) {
            setCurrentChannel(currentChannel + 1);
            audioRef.current.src = radio[currentChannel].url;
        }
    }

    function handleBackStep() {
        if (currentChannel > 0 && audioRef.current && radio) {
            setCurrentChannel(currentChannel - 1);
            audioRef.current.src = radio[currentChannel].url;
        }
    }

    return (
        <div className="w-full bg-white/95 backdrop-blur-sm border-t border-gray-100 p-4 fixed bottom-0">
            <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-3">

                <div className="w-full flex flex-col items-center gap-2">

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-emerald-600">
                            <AudioLines size={18} className="animate-pulse" />
                            <span className="text-sm font-medium">
                                {radio?.[currentChannel]?.name || "Islamic Radio"}
                            </span>
                        </div>
                        <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">
                            LIVE
                        </span>
                    </div>

                    <div className="w-full max-w-md h-1 bg-gray-100 rounded-full">
                        <div className="w-full h-full bg-emerald-500 rounded-full"></div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleBackStep}
                            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-emerald-600 transition-colors"
                            disabled={currentChannel === 0}
                        >
                            <StepBack size={20} />
                        </button>

                        <button
                            onClick={radioPlay ? handlePauseRadio : handlePlayRadio}
                            className="p-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg transition-all"
                        >
                            {radioPlay ? <Pause size={24} fill="currentColor" /> : <PlayIcon size={24} fill="currentColor" />}
                        </button>

                        <button
                            onClick={handleNextStep}
                            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-emerald-600 transition-colors"
                            disabled={!!radio && currentChannel === radio.length - 1}
                        >
                            <StepForward size={20} />
                        </button>
                    </div>

                </div>


            </div>
        </div>
    )
}