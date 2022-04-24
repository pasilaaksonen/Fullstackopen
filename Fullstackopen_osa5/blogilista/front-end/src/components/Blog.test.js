import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author and not url or likes by default', () => {
    const blogs = [{
      author: 'Robert C. Martin',
      title: 'Type wars',
      likes: 37,
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }]
  
    const component = render(
      <Blog blogs={blogs} />
    )
    
    expect(component.container).toHaveTextContent(
        'Robert C. Martin'
    )
    expect(component.container).not.toHaveTextContent(
        'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html37'
    )
})

test('url and likes are shown after clicking the view button', async () => {
    const blogs = [{
        author: 'Robert C. Martin',
        title: 'Type wars',
        likes: 37,
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        user: {
            name: "Superuser"
        }
      }]
  
    const component = render(
        <Blog blogs={blogs} />
    )
  
    const button = component.getByText('view')
    fireEvent.click(button)
  
    expect(component.container).toHaveTextContent(
        'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html37'
    )
})

test('clicking the button twice calls event handler twice', async () => {
    const blogs = [{
        author: 'Robert C. Martin',
        title: 'Type wars',
        likes: 37,
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        user: {
            name: "Superuser"
        }
      }]

    const mockHandler = jest.fn()
  
    const component = render(
        <Blog blogs={blogs} handleUpdateLikes={mockHandler} />
    )
        
    const button1 = component.getByText('view')
    fireEvent.click(button1)

    const button2 = component.getByText('like')
    fireEvent.click(button2)
    fireEvent.click(button2)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
})