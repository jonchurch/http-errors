const createError = require('../index')
var assert = require('assert')

function getProtoChain (object) {
  const chain = []
  let proto = Object.getPrototypeOf(object)
  while (proto) {
    chain.push(proto.constructor.name)
    proto = Object.getPrototypeOf(proto)
  }
  return chain
}
function getProtoString (object) {
  return getProtoChain(object).join('.')
}
describe('Inheritance', () => {
  it('Subclasses are instances of themselves', () => {
    class CustomError extends createError.NotFound {}
    const err = new CustomError()

    assert.ok(err instanceof CustomError, `Subclass not instanceof itself: looking for CustomError ${getProtoString(err)}`)
  })
  it('Subclasses are instances of their ancestors', () => {
    class CustomError extends createError.NotFound {}
    class MoreCustom extends CustomError {}
    const err = new MoreCustom()

    assert.ok(err instanceof Error, `Subclass not instanceof its ancestor: looking for Error ${getProtoString(err)}`)
    assert.ok(err instanceof createError.HttpError, `Subclass not instanceof its grandparent: looking for HttpError ${getProtoString(err)}`)
    assert.ok(err instanceof createError.NotFound, `Subclass not instanceof its grandparent: looking for NotFound ${getProtoString(err)}`)
    assert.ok(err instanceof CustomError, `Subclass not instanceof its parent: looking for CustomError ${getProtoString(err)}`)
  })

  it('Dynamic constructors are instances of themselves', () => {
    const err = createError.NotFound()

    assert.ok(err instanceof createError.NotFound, `Instance not instanceof itself: looking for NotFound ${getProtoString(err)}`)
  })
  it('Dynamic constructors are instances of their ancestors', () => {
    const err = createError.NotFound()

    assert.ok(err instanceof Error, `Subclass not instanceof its ancestor: looking for Error ${getProtoString(err)}`)
    assert.ok(err instanceof createError.HttpError, `Subclass not instanceof its grandparent: looking for HttpError ${getProtoString(err)}`)
    // ClientError isn't exported
    // assert.ok(err instanceof createError.ClientError, `Instance not instanceof its parent: looking for ClientError ${getProtoString(err)}`)
  })
})
