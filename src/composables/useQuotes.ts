interface Quote {
  id: number
  content: string
  content_alphabet: string
  author: string
  work: string
  era: string
}

interface TypingQuote extends Array<string> {
  0: string // alphabet
  1: string // japanese
}

export const useQuotes = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase || 'http://localhost:4000'

  const fetchQuotes = async (params?: Record<string, string | number | boolean>) => {
    return await $fetch<Quote[]>(`${baseUrl}/api/v1/quotes`, {
      params,
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  const fetchQuote = async (id: number) => {
    return await $fetch<Quote>(`${baseUrl}/api/v1/quotes/${id}`, {
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  const fetchRandomQuote = async () => {
    return await $fetch<Quote>(`${baseUrl}/api/v1/quotes/random`, {
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  const fetchTypingQuotes = async (limit: number = 10) => {
    return await $fetch<TypingQuote[]>(`${baseUrl}/api/v1/quotes`, {
      params: { purpose: 'typing', limit },
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  const fetchQuotesByAuthor = async (author: string) => {
    return await $fetch<Quote[]>(`${baseUrl}/api/v1/authors/${author}/quotes`, {
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  const fetchQuotesByWork = async (work: string) => {
    return await $fetch<Quote[]>(`${baseUrl}/api/v1/works/${work}/quotes`, {
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  const fetchQuotesByEra = async (era: string) => {
    return await $fetch<Quote[]>(`${baseUrl}/api/v1/eras/${era}/quotes`, {
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  return {
    fetchQuotes,
    fetchQuote,
    fetchRandomQuote,
    fetchTypingQuotes,
    fetchQuotesByAuthor,
    fetchQuotesByWork,
    fetchQuotesByEra,
  }
}