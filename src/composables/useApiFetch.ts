export const useApiFetch = () => {
  const apiFetch = $fetch.create({
    baseURL: 'http://localhost:4000',
  })
  return { apiFetch }
}
