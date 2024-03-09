const assert = require('assert')
const createError = require('../index') // Adjust the path based on your structure

describe('http-errors prototype chain tests', function () {
  it('should have the correct prototype chain for a 404 error using createError(404)', function () {
    const error = createError(404)
    assert.strictEqual(error.name, 'NotFoundError')
    assert.strictEqual(Object.getPrototypeOf(error).constructor.name, 'NotFoundError')
    assert.strictEqual(Object.getPrototypeOf(Object.getPrototypeOf(error)).constructor.name, 'HttpError')
    assert.strictEqual(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(error))).constructor.name, 'Error')
  })

  it('should have the correct prototype chain for a 404 error using createError.NotFound()', function () {
    const error = createError.NotFound()
    assert.strictEqual(error.name, 'NotFoundError')
    assert.strictEqual(Object.getPrototypeOf(error).constructor.name, 'NotFoundError')
    assert.strictEqual(Object.getPrototypeOf(Object.getPrototypeOf(error)).constructor.name, 'HttpError')
    assert.strictEqual(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(error))).constructor.name, 'Error')
  })

  it('should have the correct prototype chain for a 500 error using createError(500, "Server error", { expose: false })', function () {
    const error = createError(500, 'Server error', { expose: false })
    assert.strictEqual(error.message, 'Server error')
    assert.strictEqual(error.expose, false)
    assert.strictEqual(error.name, 'InternalServerError')
    assert.strictEqual(Object.getPrototypeOf(error).constructor.name, 'InternalServerError')
    assert.strictEqual(Object.getPrototypeOf(Object.getPrototypeOf(error)).constructor.name, 'HttpError')
    assert.strictEqual(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(error))).constructor.name, 'Error')
  })

  it('should have the correct prototype chain when wrapping an existing error', function () {
    const originalError = new Error('Original error')
    const error = createError(originalError)
    assert.strictEqual(error.message, 'Original error')
    assert.strictEqual(error.name, 'Error')
    assert.strictEqual(Object.getPrototypeOf(error).constructor.name, 'Error')
    assert.strictEqual(Object.getPrototypeOf(Object.getPrototypeOf(error)).constructor.name, 'Object')
  })

  // Additional test to check custom properties and error type
  it('should correctly set custom properties and maintain the error type', function () {
    const error = createError(404, 'Custom message', { customProperty: 'custom value' })
    assert.strictEqual(error.customProperty, 'custom value')
    assert.strictEqual(error.message, 'Custom message')
    assert.strictEqual(error.name, 'NotFoundError')
    assert.strictEqual(Object.getPrototypeOf(error).constructor.name, 'NotFoundError')
  })
})
