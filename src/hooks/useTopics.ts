import { useQuery } from '@tanstack/react-query'

export type Topic = {
  id: string
  title: string
  slug: string
}

function useTopics() {
  return useQuery<Topic[]>({
    queryKey: ['topics'],
    queryFn: async () => {
      const res = await fetch(
        `https://api.unsplash.com/topics?page=1&per_page=5&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
      )
      if (!res.ok) throw new Error('Failed to fetch topics')
      return res.json()
    }
  })
}
export default useTopics
