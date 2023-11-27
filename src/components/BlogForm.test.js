import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { act } from 'react-dom/test-utils'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('test input the blogform', async () => {
  const mockFunction = jest.fn()
  const { container } = render(<BlogForm createBlog = {mockFunction} />)
  const user = userEvent.setup()
  const title = container.querySelector('#title')
  const author = container.querySelector('#author')
  const url = container.querySelector('#url')
  const submit = screen.getByText('submit')
  await act( async () => {
    await user.type(title, 'test title')
    await user.type(author, 'test title')
    await user.type(url, 'test url')
    await submit.click()
  })
  console.log(mockFunction.mock.calls[0][0].title)
  expect(mockFunction.mock.calls).toHaveLength(1)
})
