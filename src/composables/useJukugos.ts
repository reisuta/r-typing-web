interface Jukugo {
  id: number
  expression: string
  reading: string
  reading_alphabet: string
  meaning: string
  difficulty: string
  example_sentences?: string
}

interface TypingJukugo extends Array<string> {
  0: string // reading_alphabet
  1: string // expression
  2: string // meaning
}

export const useJukugos = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase || 'http://localhost:4000'

  const fetchJukugos = async (params?: Record<string, string | number | boolean>) => {
    return await $fetch<Jukugo[]>(`${baseUrl}/api/v1/jukugos`, {
      params,
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  const fetchJukugo = async (id: number) => {
    return await $fetch<Jukugo>(`${baseUrl}/api/v1/jukugos/${id}`, {
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  const fetchRandomJukugo = async () => {
    return await $fetch<Jukugo>(`${baseUrl}/api/v1/jukugos/random`, {
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  const fetchTypingJukugos = async (limit: number = 10, difficulty?: string) => {
    return await $fetch<TypingJukugo[]>(`${baseUrl}/api/v1/jukugos`, {
      params: { purpose: 'typing', limit, difficulty },
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  const fetchJukugosByDifficulty = async (difficulty: string) => {
    return await $fetch<Jukugo[]>(`${baseUrl}/api/v1/difficulty/${difficulty}/jukugos`, {
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  return {
    fetchJukugos,
    fetchJukugo,
    fetchRandomJukugo,
    fetchTypingJukugos,
    fetchJukugosByDifficulty,
  }
}