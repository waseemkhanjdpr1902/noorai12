export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
  slug: string;
}

export const surahs: Surah[] = [
  { number: 1, name: "الفاتحة", englishName: "Al-Fatihah", englishNameTranslation: "The Opening", numberOfAyahs: 7, revelationType: "Meccan", slug: "al-fatihah" },
  { number: 2, name: "البقرة", englishName: "Al-Baqarah", englishNameTranslation: "The Cow", numberOfAyahs: 286, revelationType: "Medinan", slug: "al-baqarah" },
  { number: 3, name: "آل عمران", englishName: "Ali 'Imran", englishNameTranslation: "Family of Imran", numberOfAyahs: 200, revelationType: "Medinan", slug: "ali-imran" },
  { number: 4, name: "النساء", englishName: "An-Nisa", englishNameTranslation: "The Women", numberOfAyahs: 176, revelationType: "Medinan", slug: "an-nisa" },
  { number: 5, name: "المائدة", englishName: "Al-Ma'idah", englishNameTranslation: "The Table Spread", numberOfAyahs: 120, revelationType: "Medinan", slug: "al-maidah" },
  { number: 6, name: "الأنعام", englishName: "Al-An'am", englishNameTranslation: "The Cattle", numberOfAyahs: 165, revelationType: "Meccan", slug: "al-anam" },
  { number: 7, name: "الأعراف", englishName: "Al-A'raf", englishNameTranslation: "The Heights", numberOfAyahs: 206, revelationType: "Meccan", slug: "al-araf" },
  { number: 8, name: "الأنفال", englishName: "Al-Anfal", englishNameTranslation: "The Spoils of War", numberOfAyahs: 75, revelationType: "Medinan", slug: "al-anfal" },
  { number: 9, name: "التوبة", englishName: "At-Tawbah", englishNameTranslation: "The Repentance", numberOfAyahs: 129, revelationType: "Medinan", slug: "at-tawbah" },
  { number: 10, name: "يونس", englishName: "Yunus", englishNameTranslation: "Jonah", numberOfAyahs: 109, revelationType: "Meccan", slug: "yunus" },
  { number: 18, name: "الكهف", englishName: "Al-Kahf", englishNameTranslation: "The Cave", numberOfAyahs: 110, revelationType: "Meccan", slug: "al-kahf" },
  { number: 36, name: "يس", englishName: "Ya-Sin", englishNameTranslation: "Ya Sin", numberOfAyahs: 83, revelationType: "Meccan", slug: "ya-sin" },
  { number: 55, name: "الرحمن", englishName: "Ar-Rahman", englishNameTranslation: "The Beneficent", numberOfAyahs: 78, revelationType: "Medinan", slug: "ar-rahman" },
  { number: 56, name: "الواقعة", englishName: "Al-Waqi'ah", englishNameTranslation: "The Inevitable", numberOfAyahs: 96, revelationType: "Meccan", slug: "al-waqiah" },
  { number: 67, name: "الملك", englishName: "Al-Mulk", englishNameTranslation: "The Sovereignty", numberOfAyahs: 30, revelationType: "Meccan", slug: "al-mulk" },
  { number: 112, name: "الإخلاص", englishName: "Al-Ikhlas", englishNameTranslation: "The Sincerity", numberOfAyahs: 4, revelationType: "Meccan", slug: "al-ikhlas" },
  { number: 113, name: "الفلق", englishName: "Al-Falaq", englishNameTranslation: "The Daybreak", numberOfAyahs: 5, revelationType: "Meccan", slug: "al-falaq" },
  { number: 114, name: "الناس", englishName: "An-Nas", englishNameTranslation: "The Mankind", numberOfAyahs: 6, revelationType: "Meccan", slug: "an-nas" },
];

export const getSurahBySlug = (slug: string) => surahs.find(s => s.slug === slug);
