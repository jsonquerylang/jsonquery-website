import type { JSONQuery } from '@jsonquerylang/jsonquery'

export type JSON = JSONArray | JSONObject | JSONValue
export type JSONValue = string | number | boolean | null
export type JSONArray = JSONValue[]
export type JSONObject = { [key: string]: JSONValue }

export type JSONQueryError = Error & { jsonquery: { query: JSON }[] }

export type QueryTextFormat = { textFormat: string }
export type QueryJSONFormat = { jsonFormat: string }
export type QueryTextError = { textError: Error }
export type QueryJSONError = { jsonError: Error }
export type QueryText = QueryTextFormat | QueryJSONFormat

export type ProcessedQueryText =
  | (QueryTextFormat & (({ queryJson: JSONQuery } & QueryJSONFormat) | QueryJSONError))
  | (QueryJSONFormat & (({ queryJson: JSONQuery } & QueryTextFormat) | QueryTextError))

export type OutputOk = { json: JSON }
export type OutputError = { error: Error | JSONQueryError }
export type Output = OutputOk | OutputError
