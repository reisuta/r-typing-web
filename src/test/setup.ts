import { vi } from 'vitest'

// Mock browser APIs
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    },
    writable: true,
  })
}

// Mock Audio API
interface MockAudio {
  play: () => void
  pause: () => void
  addEventListener: () => void
  removeEventListener: () => void
}

(global as typeof global & { Audio: new () => MockAudio }).Audio = vi.fn().mockImplementation(() => ({
  play: vi.fn(),
  pause: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}))

// Mock useRuntimeConfig
const mockUseRuntimeConfig = vi.fn(() => ({
  public: {
    apiBase: 'http://localhost:4000',
  },
}))

Object.defineProperty(global, 'useRuntimeConfig', {
  value: mockUseRuntimeConfig,
  writable: true,
  configurable: true,
})

// Mock $fetch
const mockFetch = vi.fn()
Object.defineProperty(global, '$fetch', {
  value: mockFetch,
  writable: true,
  configurable: true,
})