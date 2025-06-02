import { describe, it, expect, vi } from 'vitest'
import { useQuotes } from '../useQuotes'

// Mock is handled in setup.ts

// $fetch is mocked in setup.ts

describe('useQuotes', () => {
  it('should fetch quotes with proper URL and headers', async () => {
    const mockQuotes = [
      { id: 1, content: 'Test quote', author: 'Test Author' },
    ]
    
    vi.mocked(global.$fetch).mockResolvedValueOnce(mockQuotes)
    
    const { fetchQuotes } = useQuotes()
    const result = await fetchQuotes()
    
    expect(global.$fetch).toHaveBeenCalledWith('http://localhost:4000/api/v1/quotes', {
      params: undefined,
      headers: {
        'Accept': 'application/json',
      },
    })
    expect(result).toEqual(mockQuotes)
  })

  it('should fetch typing quotes with limit', async () => {
    const mockTypingQuotes = [
      ['test', 'テスト'],
      ['hello', 'こんにちは'],
    ]
    
    vi.mocked(global.$fetch).mockResolvedValueOnce(mockTypingQuotes)
    
    const { fetchTypingQuotes } = useQuotes()
    const result = await fetchTypingQuotes(10)
    
    expect(global.$fetch).toHaveBeenCalledWith('http://localhost:4000/api/v1/quotes', {
      params: { purpose: 'typing', limit: 10 },
      headers: {
        'Accept': 'application/json',
      },
    })
    expect(result).toEqual(mockTypingQuotes)
  })

  it('should fetch single quote by id', async () => {
    const mockQuote = { id: 1, content: 'Test quote', author: 'Test Author' }
    
    vi.mocked(global.$fetch).mockResolvedValueOnce(mockQuote)
    
    const { fetchQuote } = useQuotes()
    const result = await fetchQuote(1)
    
    expect($fetch).toHaveBeenCalledWith('http://localhost:4000/api/v1/quotes/1', {
      headers: {
        'Accept': 'application/json',
      },
    })
    expect(result).toEqual(mockQuote)
  })
})