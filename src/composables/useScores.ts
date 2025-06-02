interface Score {
  id?: number
  user_name: string
  score_type: 'quotes' | 'kanjis' | 'jukugos'
  wpm: number
  accuracy: number
  time_taken: number
  completed_at: string
}

interface UserStats {
  total_games: number
  average_wpm: number
  average_accuracy: number
  best_wpm: number
  best_accuracy: number
  recent_scores: Score[]
}

export const useScores = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBase || 'http://localhost:4000'

  const fetchScores = async (params?: Record<string, string | number | boolean>) => {
    return await $fetch<Score[]>(`${baseUrl}/api/v1/scores`, {
      params,
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  const fetchScore = async (id: number) => {
    return await $fetch<Score>(`${baseUrl}/api/v1/scores/${id}`, {
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  const createScore = async (score: Omit<Score, 'id'>) => {
    return await $fetch<Score>(`${baseUrl}/api/v1/scores`, {
      method: 'POST',
      body: { score },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }

  const fetchLeaderboard = async (scoreType: string, limit: number = 10) => {
    return await $fetch<Score[]>(`${baseUrl}/api/v1/leaderboard/${scoreType}`, {
      params: { limit },
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  const fetchUserStats = async (userName: string) => {
    return await $fetch<UserStats>(`${baseUrl}/api/v1/users/${userName}/stats`, {
      headers: {
        'Accept': 'application/json',
      },
    })
  }

  return {
    fetchScores,
    fetchScore,
    createScore,
    fetchLeaderboard,
    fetchUserStats,
  }
}