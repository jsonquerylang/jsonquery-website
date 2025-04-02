import type { JSONQuery } from '@jsonquerylang/jsonquery'

export type JSONType = JSONArrayType | JSONObjectType | JSONValueType
export type JSONValueType = string | number | boolean | null
export type JSONArrayType = JSONValueType[]
export type JSONObjectType = { [key: string]: JSONValueType }

export type JSONQueryError = Error & { jsonquery: { query: JSONType }[] }

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

export type OutputOk = { json: JSONType }
export type OutputError = { error: Error | JSONQueryError }
export type Output = OutputOk | OutputError

export interface ReferenceCategory {
  name: string
  syntax: string
  description: string
  examples: string[]
  documentation: {
    title: string
    urlAnchor: string
  }
  references: Array<{
    urlAnchor: string
    syntax: string
  }>
}

export interface ReferenceDoc {
  url: string
  anchor: string
  doc: string | undefined
}
