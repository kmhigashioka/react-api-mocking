import { FormEvent } from 'react'
import useCreatePost from '../../api/use-create-post'
import useGetUserInformation from '../../api/use-get-user-information'

type CreatePostFormElement = HTMLFormElement & {
  readonly elements: HTMLFormControlsCollection & {
    title: HTMLInputElement
  }
}

export default function CreatePost() {
  const {
    data: userInformation,
    error: userInformationError,
    loading: userInformationIsLoading,
  } = useGetUserInformation()

  const {
    data: createdPostData,
    mutateAsync: createPostAsync,
    error: createPostError,
  } = useCreatePost()

  if (userInformationIsLoading) {
    return <p role="alert">Loading</p>
  }

  if (userInformationError) {
    return <p role="alert">{userInformationError.message}</p>
  }

  if (!userInformation) {
    return <p role="alert">No user information was retrieved.</p>
  }

  const hasWritePostPermission = userInformation.permissions.find(permission => permission == 'posts.write')

  if (!hasWritePostPermission) {
    return <p role="alert">The page you&apos;re trying access has restricted access.</p>
  }

  const handleFormSubmit = (event: FormEvent<CreatePostFormElement>) => {
    event.preventDefault()

    createPostAsync({
      title: event.currentTarget.elements.title.value,
    })
  }

  return (
    <div>
      <h1>Create Post</h1>

      <form onSubmit={handleFormSubmit}>
        <label>
          Title
          <input type="text" name="title" placeholder="Title" />
        </label>

        <button>Create post</button>

        {createdPostData ? (
          <p role="alert">Post created</p>
        ) : null}

        {createPostError ? (
          <p role="alert">{createPostError.message}</p>
        ) : null}
      </form>
    </div>
  )
}
