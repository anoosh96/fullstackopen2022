const average = require('../utils/for_testing').average


describe('average', ()=>{
  test('of one value is the value itself', ()=> {
    const avg = average([4])
    expect(avg).toBe(4)
  })

  test('of many is calculated right', ()=> {
    const avg = average([1, 2, 3, 4])
    debugger
    expect(avg).toBe(2.5)
  })
})