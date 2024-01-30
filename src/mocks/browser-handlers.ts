import { HttpResponse, PathParams, http } from 'msw'
import apiEndpoint from '../paths/api-endpoint'
import { GetMyInformationSuccessResponseData } from '../api/use-get-user-information'
import { CreatePostParams, CreatePostResponseData } from '../api/use-create-post'

export const browserHandlers = [
  http.get(apiEndpoint.me(), () => {
    return HttpResponse.json<GetMyInformationSuccessResponseData>({
      id: 1000,
      name: 'John Doe',
      permissions: ['posts.write'],
    })
  }),

  http.post<PathParams, CreatePostParams, CreatePostResponseData>(apiEndpoint.createPost(), async ({ request }) => {
    const requestBody = await request.json()
    return HttpResponse.json({
      id: 2000,
      title: requestBody.title,
    })
  }),
]
