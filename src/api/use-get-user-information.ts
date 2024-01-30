import { useEffect, useState } from 'react'
import apiEndpoint from '../paths/api-endpoint'

type Permission = 'posts.write'

export type GetMyInformationSuccessResponseData = {
  id: number
  name: string
  permissions: Permission[]
}

export default function useGetMyInformation() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<GetMyInformationSuccessResponseData | null>(
    null,
  )
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchMyInformationAsync = async () => {
      setLoading(true)

      try {
        const data = await getMyInformationAsync()
        setData(data)
      } catch (error) {
        if (error instanceof Error) {
          setError(error)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchMyInformationAsync()
  }, [])

  return {
    loading,
    data,
    error,
  }
}

async function getMyInformationAsync() {
  const response = await fetch(apiEndpoint.me())
  const data: GetMyInformationSuccessResponseData = await response.json()
  return data
}
