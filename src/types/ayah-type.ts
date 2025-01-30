export interface AyahsType {
  surahName: string;
  surahNameArabic: string;
  surahNameArabicLong: string;
  surahNameTranslation: string;
  revelationPlace: string;
  totalAyah: number;
  surahNo: number;
  audio: {
    [key: string]: {
      reciter: string;
      url: string;
      originalUrl: string;
    };
  };
  english: string[];
  arabic1: string[];
  arabic2: string[];
}
