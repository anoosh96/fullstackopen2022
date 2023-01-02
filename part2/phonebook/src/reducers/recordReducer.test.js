import recordReducer from './recordReducer'
import deepFreeze from 'deep-freeze'

describe('recordReducer', () => {
  test('returns new state with action NEW_RECROD', () => {
    const state = {records: []}
    const action = {
      type: 'NEW_RECORD',
      data: {
        name: 'Jon Doe 2',
        number: '324211133',
        id: 14233
      }
    }

    deepFreeze(state)
    const newState = recordReducer(state, action)

    expect(newState.records).toHaveLength(1)
    expect(newState.records).toContainEqual(action.data)
  })
})