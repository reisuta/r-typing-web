export const storage = {
  get<T> (key: string, defaultValue?: T): T | null {
    try {
      if (typeof window === 'undefined') return defaultValue || null
      
      const item = window.localStorage.getItem(key)
      if (item === null) return defaultValue || null
      
      try {
        return JSON.parse(item)
      } catch {
        // If JSON parsing fails, return as string
        return item as T
      }
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error)
      return defaultValue || null
    }
  },

  set (key: string, value: unknown): boolean {
    try {
      if (typeof window === 'undefined') return false
      
      const serialized = typeof value === 'string' ? value : JSON.stringify(value)
      window.localStorage.setItem(key, serialized)
      return true
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error)
      return false
    }
  },

  remove (key: string): boolean {
    try {
      if (typeof window === 'undefined') return false
      
      window.localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
      return false
    }
  },

  clear (): boolean {
    try {
      if (typeof window === 'undefined') return false
      
      window.localStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  },
}

// Storage keys constants
export const STORAGE_KEYS = {
  USER_NAME: 'userName',
  SOUND_ENABLED: 'soundEnabled',
  SHOW_TIMER: 'showTimer',
  SHOW_KEYBOARD: 'showKeyboard',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const