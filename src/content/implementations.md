# Implementations

This page gives an overview of the JSON Query libraries that are available in various programming languages.

## JavaScript

Documentation: https://github.com/jsonquerylang/jsonquery

Install via npm:

```text
npm install @jsonquerylang/jsonquery
```

Usage:

```js
import { jsonquery } from '@jsonquerylang/jsonquery'

const data = {
  "friends": [
    { "name": "Chris", "age": 23, "city": "New York" },
    { "name": "Emily", "age": 19, "city": "Atlanta" },
    { "name": "Joe", "age": 32, "city": "New York" },
    { "name": "Kevin", "age": 19, "city": "Atlanta" },
    { "name": "Michelle", "age": 27, "city": "Los Angeles" },
    { "name": "Robert", "age": 45, "city": "Manhattan" },
    { "name": "Sarah", "age": 31, "city": "New York" }
  ]
}

// Get the array containing the friends from the object, filter the friends that live in New York,
// sort them by age, and pick just the name and age out of the objects.
const output = jsonquery(data, `
  .friends 
    | filter(.city == "New York") 
    | sort(.age) 
    | pick(.name, .age)
`)
// output = [
//   { "name": "Chris", "age": 23 },
//   { "name": "Sarah", "age": 31 },
//   { "name": "Joe", "age": 32 }
// ]
```

## Python

Documentation: https://github.com/jsonquerylang/jsonquery-python

Install via PyPi:

```text
pip install jsonquerylang
```

Usage:

```python
from jsonquerylang import jsonquery
from pprint import pprint

data = {
    "friends": [
        {"name": "Chris", "age": 23, "city": "New York"},
        {"name": "Emily", "age": 19, "city": "Atlanta"},
        {"name": "Joe", "age": 32, "city": "New York"},
        {"name": "Kevin", "age": 19, "city": "Atlanta"},
        {"name": "Michelle", "age": 27, "city": "Los Angeles"},
        {"name": "Robert", "age": 45, "city": "Manhattan"},
        {"name": "Sarah", "age": 31, "city": "New York"}
    ]
}

# Get the array containing the friends from the object, filter the friends that live in New York,
# sort them by age, and pick just the name and age out of the objects.
output = jsonquery(data, """
    .friends 
        | filter(.city == "New York") 
        | sort(.age) 
        | pick(.name, .age)
""")
pprint(output)
# [{'age': 23, 'name': 'Chris'},
#  {'age': 31, 'name': 'Sarah'},
#  {'age': 32, 'name': 'Joe'}]
```

## .Net

Documentation: [https://github.com/lateapexearlyspeed/Lateapexearlyspeed.JsonSchema](https://github.com/lateapexearlyspeed/Lateapexearlyspeed.JsonSchema?tab=readme-ov-file#jsonquerynet)

Install via NuGet:

```text
dotnet add package LateApexEarlySpeed.Json.Schema
```

Usage:

```dotnet
IJsonQueryable queryable = JsonQueryable.Parse(jsonQuery);
JsonNode? result = queryable.Query(jsonData);
```

## How to implement in a new language

Support for JSON Query language can be implemented in new programming languages. Implementing the query engine is most straight forward: this boils down to implementing each of the functions (`sort`, `filter`, `groupBy`, etc.), and creating a compiler which can go through a JSON Query like `["sort", ["get", "name"], "desc"]` look up the function `sort`, and pass the arguments to it. Implementing a parser and stringifier is a bit more work, but the parser and stringifier of for example the JavaScript implementation can be used as a reference.

There is a JSON based Test Suite available that can be used to ensure that your implementation matches the behavior of the reference implementation, see: [Test Suite](https://github.com/jsonquerylang/jsonquery/blob/develop/test-suite/README.md). 

A new implementation can be made for example by porting the [JavaScript implementation](https://github.com/jsonquerylang/jsonquery) to a new programming language.

To get a new implementation listed on this page, please open an issue at the repository of the website: https://github.com/jsonquerylang/jsonquery-website
