/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';

export default class CodeEditorController extends Controller {
  demoCode = `console.log('Hello, world!');`;

  languages = [
    {
      value: 'go',
      label: 'Go',
      code: `package main

import "fmt"

func main() {
    fmt.Println("Hello, world!")
    fmt.Println("Welcome to Go!")
}`
    },
    {
      value: 'javascript',
      label: 'JavaScript',
      code: `function greet() {
    console.log('Hello, world!');
}

greet();`
    },
    {
      value: 'json',
      label: 'JSON',
      code: `{
    "message": "Hello, world!",
    "status": "success",
    "data": null
}`
    },
    {
      value: 'sql',
      label: 'SQL',
      code: `SELECT 'Hello, world!';
SELECT 'Welcome to SQL!';
SELECT 'Enjoy coding!';`
    },
  ];
}
