import type { JSONQueryError, Output, OutputError, QueryText, QueryTextFormat } from './types'

export function isTextFormat(query: QueryText): query is QueryTextFormat {
  return query && 'textFormat' in query
}

export function isOutputError(output: Output): output is OutputError {
  return output && 'error' in output
}

export function isJSONQueryError(error: Error): error is JSONQueryError {
  return error && 'jsonquery' in error
}
