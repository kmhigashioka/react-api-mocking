import { fireEvent, render, screen } from '@testing-library/react'
import { HttpResponse, http } from 'msw'
import { beforeEach, describe, expect, test } from 'vitest'
import CreatePost from './CreatePost'
import { server } from '../../mocks/node'
import apiEndpoint from '../../paths/api-endpoint'
import { GetMyInformationSuccessResponseData } from '../../api/use-get-user-information'
import { CreatePostResponseData } from '../../api/use-create-post'

describe('when user has write post permission', () => {
  beforeEach(() => {
    server.use(
      http.get(apiEndpoint.me(), () => {
        return HttpResponse.json<GetMyInformationSuccessResponseData>({
          id: 1000,
          name: 'John Doe',
          permissions: ['posts.write'],
        })
      }),

      http.post(apiEndpoint.createPost(), () => {
        return HttpResponse.json<CreatePostResponseData>({
          id: 2000,
          title: 'My awesome post',
        })
      }),
    )

    render(<CreatePost />)
  })

  test('can create post', async () => {
    fireEvent.change(
      await screen.findByRole('textbox', { name: /title/i }),
      {
        target: { value: 'My awesome post' },
      },
    )

    fireEvent.click(
      screen.getByRole('button', { name: /create post/i }),
    )

    expect(
      await screen.findByText(/post created/i)
    ).toBeInTheDocument()
  })
})

describe('when user has no post permission', () => {
  beforeEach(() => {
    server.use(
      http.get(apiEndpoint.me(), () => {
        return HttpResponse.json<GetMyInformationSuccessResponseData>({
          id: 1000,
          name: 'John Doe',
          permissions: [],
        })
      }),
    )

    render(<CreatePost />)
  })

  test('cannot create post', async () => {
    expect(
      await screen.findByText(/the page you're trying access has restricted access./i)
    ).toBeInTheDocument()
  })
})
