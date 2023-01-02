import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen} from '@testing-library/react'
import Record from './Record'
import userEvent from '@testing-library/user-event'


describe('Record', () => {
  let containerr;
  let rerenderr;
  let phone;
  let delHandler;

  beforeEach(()=>{
    phone = {
      name: 'Jon Doe',
      number: '432425555',
      id: '234242fv33'
    }

    delHandler = jest.fn()
    const {container, rerender} = render(
      <Record
        record={phone}
        showDelete={true}
        deleteHandler={delHandler}
      />
    )
    containerr = container
    rerenderr = rerender
  })

  test('should render name and number', () => {
    const elem = containerr.querySelector('li')
    expect(elem).toHaveTextContent(phone.name)
    expect(elem).toHaveTextContent(phone.number)
  })

  test('should call the delete handler function when delete button is clicked', async () => {
    const button = containerr.querySelector('li button')
    const user = userEvent.setup()
    await user.click(button)
    expect(delHandler.mock.calls).toHaveLength(1)
    expect(delHandler.mock.calls[0][0]).toBe(phone.id)
  })

  test('shouldnt show delete button when showDelete is false', async () => {
    rerenderr(
      <Record
        record={phone}
        showDelete={false}
        deleteHandler={delHandler}
      />
    )

    const delButton = screen.queryByText('delete')
    expect(delButton).toBeNull()
  })
})

