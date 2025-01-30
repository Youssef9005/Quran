/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import MainHeader from "@/components/main-header";
import RadioController from "@/components/radio-controls";
import SurahItem from "@/components/surah-item";
import { RadioType } from "@/types/radio-type";
import { SurahType } from "@/types/surah-type";
import axios from "axios"
import { useEffect, useRef, useState } from "react"

export default function App() {
  const [surah, setSurah] = useState<SurahType[]>([]);
  const [radio, setRadio] = useState<RadioType[] | null>(null);
  const [currentChannel, setCurrentChannel] = useState<number>(0);
  const [radioPlay, setRadioPlay] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Get Surah
  useEffect(() => {
    async function getSurah() {
      const response = await axios.get('https://quranapi.pages.dev/api/surah.json')
      const data = await response.data;
      setSurah(data);
    }

    getSurah();
  }, []);

  // Get Radio 
  useEffect(() => {
    async function getRadio() {
      const response = await axios.get('https://mp3quran.net/api/v3/radios?language=eng')
      const data = await response.data;
      setRadio(data.radios);
    }

    getRadio();
  }, []);

  useEffect(() => {
    if (radio && audioRef.current) {
      audioRef.current.src = radio[currentChannel].url;
      audioRef.current.play();
      setRadioPlay(true);
    }
  }, [currentChannel]);

  return (
    <main className="w-full min-h-screen">
      <audio ref={audioRef} src="https://backup.qurango.net/radio/ahmad_alajmy"></audio>
      <MainHeader />

      <SurahItem surah={surah} />




      <RadioController
        audioRef={audioRef}
        currentChannel={currentChannel}
        radio={radio}
        radioPlay={radioPlay}
        setCurrentChannel={setCurrentChannel}
        setRadioPlay={setRadioPlay} />

    </main>
  )
}