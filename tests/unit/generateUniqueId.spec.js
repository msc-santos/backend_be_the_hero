const generateUniqueId = require('../../utils/generateUniqueId')

describe('generate unique id', () => {
  it('should generate an unique ID', () => {
    const id = generateUniqueId().uniqueId()
    expect(id).toHaveLength(8)
  })
})