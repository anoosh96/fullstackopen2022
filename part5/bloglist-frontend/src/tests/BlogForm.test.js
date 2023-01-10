import BlogForm from '../components/BlogForm'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('BlogForm Component', () => {
  test('submit handler is called when form is submitted', async () => {
    const submitHandler = jest.fn()
    render(<BlogForm submitHandler={submitHandler} />)
    const user = userEvent.setup()

    const btn = screen.getByText('Add')
    await user.click(btn)

    expect(submitHandler.mock.calls.length).toBe(1)
  })
})
