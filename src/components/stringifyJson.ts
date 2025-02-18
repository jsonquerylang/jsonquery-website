import { Formatter, FracturedJsonOptions } from 'fracturedjsonjs'

export function stringifyJson(json: unknown): string {
  const formatter = new Formatter()
  formatter.Options = new FracturedJsonOptions()
  formatter.Options.MaxTotalLineLength = 55
  formatter.Options.IndentSpaces = 2
  formatter.Options.MaxInlineComplexity = 3
  formatter.Options.SimpleBracketPadding = false
  formatter.Options.NestedBracketPadding = false
  formatter.Options.OmitTrailingWhitespace = true

  return formatter.Reformat(JSON.stringify(json, null, 2))
}
