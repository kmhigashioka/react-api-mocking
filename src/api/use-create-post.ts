import { useCallback, useState } from 'react'
import apiEndpoint from '../paths/api-endpoint'

export type CreatePostParams = {
  title: string;
}

export type CreatePostResponseData = {
  id: number;
  title: string;
}

export default function useCreatePost() {
  const [data, setData] = useState<CreatePostResponseData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const mutateAsync = useCallback(async (params: CreatePostParams) => {
    try {
      setLoading(true)
      setError(null)
      setData(null)

      const data = await createPostAsync(params)
      setData(data)
      return data
    } catch (error) {
      if (error instanceof Error) {
        setError(error)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    data,
    loading,
    mutateAsync,
    error,
  }
}

async function createPostAsync(params: CreatePostParams) {
  const response = await fetch(apiEndpoint.createPost(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  const data: CreatePostResponseData = await response.json()

  return data
}
