const input2 = `[
  {"name": "Chris", "age": 23, "city": "New York"},
  {"name": "Emily", "age": 19, "city": "Atlanta"},
  {"name": "Joe", "age": 32, "city": "New York"},
  {"name": "Kevin", "age": 19, "city": "Atlanta"},
  {"name": "Michelle", "age": 27, "city": "Los Angeles"},
  {"name": "Robert", "age": 45, "city": "Manhattan"},
  {"name": "Sarah", "age": 31, "city": "New York"}
]
`

export interface Example {
  name: string
  input: string
  query: string
}

export const examples: Example[] = [
  {
    name: 'example 1',
    input: `{
  "friends": [
    {"name": "Chris", "age": 23, "city": "New York"},
    {"name": "Emily", "age": 19, "city": "Atlanta"},
    {"name": "Joe", "age": 32, "city": "New York"},
    {"name": "Kevin", "age": 19, "city": "Atlanta"},
    {"name": "Michelle", "age": 27, "city": "Los Angeles"},
    {"name": "Robert", "age": 45, "city": "Manhattan"},
    {"name": "Sarah", "age": 31, "city": "New York"}
  ]
}`,
    query: `.friends
  | filter(.city == "New York")
  | sort(.age)
  | pick(.name, .age)`
  },
  {
    name: 'example 2',
    input: input2,
    query: `filter((.city == "New York") and (.age > 30))\n`
  },
  {
    name: 'example 3',
    input: input2,
    query: `map({
  firstName: .name,
  details: {
    city: .city,
    age: .age
  }
})
`
  },
  {
    name: 'example 4',
    input: input2,
    query: `{
  names: map(.name),
  count: size(),
  averageAge: map(.age) | average()
}
`
  },
  {
    name: 'example 5',
    input: `[
  { "name": "bread", "price": 2.5, "quantity": 2 },
  { "name": "milk", "price": 1.2, "quantity": 3 }
]
`,
    query: 'map(.price * .quantity) | sum()\n'
  }
]
