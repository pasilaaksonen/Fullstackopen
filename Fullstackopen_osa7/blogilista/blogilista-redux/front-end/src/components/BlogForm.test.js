import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const mockHandler = jest.fn()

  const component = render(
    <BlogForm handleNewBlog={mockHandler} />
  )

  const input1 = component.container.querySelector('#title')
  const input2 = component.container.querySelector('#author')
  const input3 = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(input1, { 
    target: { value: 'test title' } 
  })
  fireEvent.change(input2, { 
    target: { value: 'test author' } 
  })
  fireEvent.change(input3, { 
    target: { value: 'test url' } 
  })
  fireEvent.submit(form)
  // console.log(mockHandler.mock.calls.content)
  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].content).toBe('test title' )
  expect(mockHandler.mock.calls[0][1].content).toBe('test author' )
  expect(mockHandler.mock.calls[0][2].content).toBe('test url' )
})