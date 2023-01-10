import Blog from '../components/Blog'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Blog Component', () => {
  let container
  let blog = {
    title: 'blog1',
    author: 'author213',
    url: 'sdfasf',
    likes: 10,
    user: {
      id: '39981cvb',
      email: 'test@test.com',
      name: 'tester' 
    }
  }
  
  let likeHandler = jest.fn()
  let deleteHandler = jest.fn()
  let showRemove = false

  beforeEach(()=>{
    const renderObj = render(
      <Blog 
        blog={blog}
        likeHandler={likeHandler}
        deleteHandler={deleteHandler}
        showRemove={showRemove}
      />
    )

    container = renderObj.container
  })

  test('renders title and not other details by default', () => {
    const title = container.querySelector('.title')
    const details = container.querySelector('.details')
    expect(title).toBeDefined()
    expect(details).toBeNull()
  })

  test('renders all details when view detials is clicked', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('#toggle-details')
    await user.click(button)

    const details = container.querySelector('.details')
    screen.debug(details)
    expect(details).toBeDefined()
  })

  test('like handler called twice when like button is clicked twice', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('#toggle-details')
    await user.click(button)
    
    const likeBtn = container.querySelector('#like-btn')
    await user.click(likeBtn)
    await user.click(likeBtn)

    expect(likeHandler.mock.calls.length).toBe(2)
  })

})


