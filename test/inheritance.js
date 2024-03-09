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

describe('Inheritance', () => {
  it('Subclasses are instances of themselves', () => {
    class CustomError extends createError.NotFound {}
    const err = new CustomError()

    assert.ok(err instanceof CustomError, `Subclass not instanceof itself: looking for CustomError ${getProtoChain(err).join('.')}`)
  })
  it('Subclasses are instances of their ancestors', () => {
    class CustomError extends createError.NotFound {}
    class MoreCustom extends CustomError {}
    const err = new MoreCustom()

    assert.ok(err instanceof Error, `Subclass not instanceof its ancestor: looking for Error ${getProtoChain(err).join('.')}`)
    assert.ok(err instanceof createError.HttpError, `Subclass not instanceof its grandparent: looking for HttpError ${getProtoChain(err)}`)
    assert.ok(err instanceof CustomError, `Subclass not instanceof its parent: looking for CustomError ${getProtoChain(err).join('.')}`)
  })
})
