const prependPath = (path: string) => `${import.meta.env.VITE_API_URL}${path}`

const apiEndpoint = {
  me: () => prependPath('/api/me'),
  createPost: () => prependPath('/api/posts'),
}

export default apiEndpoint
