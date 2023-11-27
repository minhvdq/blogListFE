import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('testing blog', () => {
  let container
  let mockHandleLike
  beforeEach(() => {
    mockHandleLike = jest.fn()
    const blog = {
      title: 'test title',
      url: 'test url',
      author: 'test author',
      likes: 0,
      user: {
        username: 'curUsername',
        id: '123'
      }
    }

    const curUser = {
      username: 'curUsername',
      id: '123'
    }

    container = render(<Blog blog={ blog } curUser = { curUser } handleLike={mockHandleLike} />).container

  })
  test('test default blog', () => {
    const div = container.querySelector('.moreInfor')

    const element = screen.getByText('test title', { exact: false })
    const element2 = screen.getByText('test author', { exact: false })

    expect(element).toBeDefined()
    expect(element2).toBeDefined()
    expect(div).toHaveStyle({ display: 'none' })
  })

  test('view button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.moreInfor')

    expect(div).not.toHaveStyle({ display: 'none' })
  })

  test( 'like button clicked twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    //console.log(container.blog.likes)
    await user.click(likeButton)
    expect(mockHandleLike.mock.calls).toHaveLength(2)
  })
})
