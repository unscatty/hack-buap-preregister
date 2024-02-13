import { type ValueError } from 'typebox-validators'

export const formValidationErrors = (errors: Iterable<ValueError>) => {
  const errorObject: Record<string, string> = {}

  for (const error of errors) {
    errorObject[error.path.substring(1)] = error.message
  }

  return errorObject
}
