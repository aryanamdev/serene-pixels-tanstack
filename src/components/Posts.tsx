import { useInfiniteQuery } from '@tanstack/react-query'
import type { Post } from '../types'
import {
  Avatar,
  Box,
  Card,
  Grid,
  Inset,
  Text,
  Flex,
  TextField,
  type ButtonProps
} from '@radix-ui/themes'
import { useCallback, useEffect, useRef, useState } from 'react'
import useDebounce from '../hooks/useDebounce'
import useTopics, { type Topic } from '../hooks/useTopics'
import Topics from './Topics'


function Posts() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const [search, setSearch] = useState('')
  const [topic, setTopic] = useState('')

  const debouncedSearch = useDebounce(search)
  const { data: topicsData } = useTopics()

  const getBaseUrl = useCallback(() => {
    if (!topic && !debouncedSearch) {
      return "https://api.unsplash.com/photos"
    } else if (debouncedSearch) {
      return 'https://api.unsplash.com/search/photos'
    }
    else {
      return `https://api.unsplash.com/topics/${topic}/photos`
    }
  }, [topic, debouncedSearch])


  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<Post[]>({
    queryKey: ['photos', debouncedSearch, topic],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {

      const baseUrl = getBaseUrl()

      const params = new URLSearchParams({
        page: String(pageParam),
        per_page: '9',
        client_id: import.meta.env.VITE_UNSPLASH_ACCESS_KEY
      })

      if (debouncedSearch) params.append('query', debouncedSearch)
      if (topic) params.append('topics', topic)

      const res = await fetch(`${baseUrl}?${params}`)
      if (!res.ok) throw new Error('Fetch failed')

      const json = await res.json()
      return debouncedSearch ? json.results : json
    },
    getNextPageParam: (_, pages) => pages.length + 1
  })

  // Intersection Observer for Pagination
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return

    const observer = new IntersectionObserver(entries => {
      console.log({entries})
      if (entries[0].isIntersecting) fetchNextPage()
    })

    observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage])

  const handleTopicChange = (t: Topic) => {
              if(topic === t?.id){
                setTopic("")
              }else{
                setTopic(t?.id)
              }
  }

  const getVariant = (t: Topic): ButtonProps["variant"] => {
    if(topic === t?.id){
      return "solid"
    }else {
      return "soft"
    }
  }

  if (isLoading)
    return (
      <Flex justify="center" align="center" height="200px">
        <Text>Loading images…</Text>
      </Flex>
    )

  if (error)
    return (
      <Flex justify="center" align="center" height="200px">
        <Text color="red">Something went wrong</Text>
      </Flex>
    )

  return (
    <Box>
      <Flex gap="3" mb="5" wrap="wrap">
        <TextField.Root
          placeholder="Search photos…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 240 }}
        />

        <Topics topics={topicsData ?? []} onTopicChange={handleTopicChange} getVaritant={getVariant}/>
      </Flex>

      <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
        {data?.pages.flat().map(post => (
          <Card
            key={post.id}
            style={{
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <Inset side="top">
              <img
                src={post.urls.regular}
                alt={post.alt_description ?? 'Unsplash image'}
                style={{
                  width: '100%',
                  height: 180,
                  objectFit: 'cover'
                }}
              />
            </Inset>

            <Box p="3">
              <Flex align="center" gap="3" mb="2">
                <Avatar
                  size="2"
                  src={post.user.profile_image.small}
                  fallback={post.user.name[0]}
                />
                <Text size="2">{post.user.name}</Text>
              </Flex>

              <Text size="2" color="gray">
                {post.alt_description ?? 'A moment captured beautifully.'}
              </Text>
            </Box>
          </Card>
        ))}
      </Grid>

      <Flex justify="center" mt="6">
        <div ref={loadMoreRef} />
        {isFetchingNextPage && <Text>Loading more…</Text>}
      </Flex>
    </Box >
  )
}

export default Posts
