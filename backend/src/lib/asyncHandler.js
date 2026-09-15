// Wraps an async route handler so any rejected promise (DB timeout, etc.)
// is passed to next(err) instead of becoming an unhandled rejection that
// kills the process. Use for every async route handler.
export function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}
