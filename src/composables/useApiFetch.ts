export const useApiFetch = () => {
  const apiFetch = $fetch.create({
    baseURL: 'http://localhost:3000',
  })
  return { apiFetch }
}
