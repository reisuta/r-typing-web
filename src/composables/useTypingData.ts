type TypingData = [string, string] | [string, string, string]

export const useTypingData = (dataType: 'quotes' | 'kanjis' | 'jukugos') => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase || 'http://localhost:4000'

  const fetchTypingData = async (limit: number = 10): Promise<TypingData[]> => {
    const endpoint = getEndpoint(dataType)
    
    return await $fetch<TypingData[]>(`${baseUrl}/api/v1/${endpoint}`, {
      params: { purpose: 'typing', limit },
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  const fetchRandomItem = async () => {
    const endpoint = getEndpoint(dataType)
    
    return await $fetch(`${baseUrl}/api/v1/${endpoint}/random`, {
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  const fetchByFilter = async (filterKey: string, filterValue: string) => {
    const endpoint = getEndpoint(dataType)
    let apiPath = ''

    switch (dataType) {
    case 'quotes':
      if (['author', 'work', 'era'].includes(filterKey)) {
        apiPath = `${baseUrl}/api/v1/${filterKey}s/${filterValue}/${endpoint}`
      }
      break
    case 'kanjis':
      if (filterKey === 'grade') {
        apiPath = `${baseUrl}/api/v1/grades/${filterValue}/${endpoint}`
      }
      break
    case 'jukugos':
      if (filterKey === 'difficulty') {
        apiPath = `${baseUrl}/api/v1/difficulty/${filterValue}/${endpoint}`
      }
      break
    }

    if (!apiPath) {
      // Fallback to regular endpoint with params
      return await $fetch(`${baseUrl}/api/v1/${endpoint}`, {
        params: { [filterKey]: filterValue },
        headers: {
          'Accept': 'application/json',
        },
      })
    }

    return await $fetch(apiPath, {
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  return {
    fetchTypingData,
    fetchRandomItem,
    fetchByFilter,
  }
}

function getEndpoint (dataType: 'quotes' | 'kanjis' | 'jukugos'): string {
  switch (dataType) {
  case 'quotes':
    return 'quotes'
  case 'kanjis':
    return 'kanjis'
  case 'jukugos':
    return 'jukugos'
  default:
    throw new Error(`Unknown data type: ${dataType}`)
  }
}