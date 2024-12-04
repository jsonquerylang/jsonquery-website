import type { JSONQuery } from '@jsonquerylang/jsonquery'

export type JSON = JSONArray | JSONObject | JSONValue
export type JSONValue = string | number | boolean | null
export type JSONArray = JSONValue[]
export type JSONObject = { [key: string]: JSONValue }

export type JSONQueryError = Error & { jsonquery: { query: JSON }[] }

export type QueryTextFormat = { textFormat: string }
export type QueryJSONFormat = { jsonFormat: string }
export type QueryText = QueryTextFormat | QueryJSONFormat

export type ProcessedQuery = {
  textFormat?: string
  jsonFormat?: string
  queryJson?: JSONQuery
  textError?: Error
  jsonError?: Error
}

export type OutputOk = { json: JSON }
export type OutputError = { error: Error | JSONQueryError }
export type Output = OutputOk | OutputError
