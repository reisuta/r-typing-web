import { describe, it, expect, vi } from 'vitest'
import { useScores } from '../useScores'

// Mock is handled in setup.ts

// $fetch is mocked in setup.ts

describe('useScores', () => {
  it('should create a new score', async () => {
    const newScore = {
      user_name: 'Test User',
      score_type: 'quotes' as const,
      wpm: 50,
      accuracy: 95.5,
      time_taken: 60,
      completed_at: '2024-01-01T00:00:00Z',
    }
    
    const mockCreatedScore = { id: 1, ...newScore }
    
    vi.mocked(global.$fetch).mockResolvedValueOnce(mockCreatedScore)
    
    const { createScore } = useScores()
    const result = await createScore(newScore)
    
    expect(global.$fetch).toHaveBeenCalledWith('http://localhost:4000/api/v1/scores', {
      method: 'POST',
      body: { score: newScore },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    expect(result).toEqual(mockCreatedScore)
  })

  it('should fetch leaderboard for specific score type', async () => {
    const mockLeaderboard = [
      { id: 1, user_name: 'User1', wpm: 100, accuracy: 98 },
      { id: 2, user_name: 'User2', wpm: 95, accuracy: 97 },
    ]
    
    vi.mocked(global.$fetch).mockResolvedValueOnce(mockLeaderboard)
    
    const { fetchLeaderboard } = useScores()
    const result = await fetchLeaderboard('quotes', 5)
    
    expect(global.$fetch).toHaveBeenCalledWith('http://localhost:4000/api/v1/leaderboard/quotes', {
      params: { limit: 5 },
      headers: {
        'Accept': 'application/json',
      },
    })
    expect(result).toEqual(mockLeaderboard)
  })

  it('should fetch user stats', async () => {
    const mockStats = {
      total_games: 10,
      average_wpm: 75,
      average_accuracy: 92.5,
      best_wpm: 100,
      best_accuracy: 99.5,
      recent_scores: [],
    }
    
    vi.mocked(global.$fetch).mockResolvedValueOnce(mockStats)
    
    const { fetchUserStats } = useScores()
    const result = await fetchUserStats('TestUser')
    
    expect(global.$fetch).toHaveBeenCalledWith('http://localhost:4000/api/v1/users/TestUser/stats', {
      headers: {
        'Accept': 'application/json',
      },
    })
    expect(result).toEqual(mockStats)
  })
})