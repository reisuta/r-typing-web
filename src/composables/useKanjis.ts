interface Kanji {
  id: number
  character: string
  reading_on: string
  reading_kun: string
  meaning: string
  grade: string
  stroke_count: number
  example_words?: string
  example_sentences?: string
  radical?: string
}

interface TypingKanji extends Array<string> {
  0: string // reading_on
  1: string // character
  2: string // meaning
}

export const useKanjis = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase || 'http://localhost:4000'

  const fetchKanjis = async (params?: Record<string, string | number | boolean>) => {
    return await $fetch<Kanji[]>(`${baseUrl}/api/v1/kanjis`, {
      params,
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  const fetchKanji = async (id: number) => {
    return await $fetch<Kanji>(`${baseUrl}/api/v1/kanjis/${id}`, {
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  const fetchRandomKanji = async () => {
    return await $fetch<Kanji>(`${baseUrl}/api/v1/kanjis/random`, {
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  const fetchTypingKanjis = async (limit: number = 10) => {
    return await $fetch<TypingKanji[]>(`${baseUrl}/api/v1/kanjis`, {
      params: { purpose: 'typing', limit },
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  const fetchKanjisByGrade = async (grade: string) => {
    return await $fetch<Kanji[]>(`${baseUrl}/api/v1/grades/${grade}/kanjis`, {
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  return {
    fetchKanjis,
    fetchKanji,
    fetchRandomKanji,
    fetchTypingKanjis,
    fetchKanjisByGrade,
  }
}