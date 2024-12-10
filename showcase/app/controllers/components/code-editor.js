/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class CodeEditorController extends Controller {
  @tracked showCodeEditor = false;

  demoCode = `lorem ipsum dolor sit amet
consectetur adipiscing elit
sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua`;

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
