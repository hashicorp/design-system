/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';

export default class CodeEditorController extends Controller {
  demoCode = `lorem ipsum dolor sit amet
consectetur adipiscing elit
sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua`;

  languages = [
    {
      value: 'ruby',
      label: 'Ruby',
      code: `require 'date'

file_name = 'example_file.txt'
log_file = 'script.log'

if File.exist?(file_name)
  File.open(log_file, 'a') { |f| f.puts("#{Time.now}: File #{file_name} already exists") }
else
  File.open(file_name, 'w') { |f| f.puts("This is a new file.") }
  File.open(log_file, 'a') { |f| f.puts("#{Time.now}: Created file #{file_name}") }
end`,
    },
    {
      value: 'shell',
      label: 'Shell',
      code: `DIR="example_directory"
LOG_FILE="script.log"

if [ ! -d "$DIR" ]; then
  mkdir "$DIR"
  echo "$(date): Created directory $DIR" >> "$LOG_FILE"
else
  echo "$(date): Directory $DIR already exists" >> "$LOG_FILE"
fi`,
    },
    {
      value: 'go',
      label: 'Go',
      code: `package main

import "fmt"

func main() {
  fmt.Println("Hello, world!")
  fmt.Println("Welcome to Go!")
}`,
    },
    {
      value: 'hcl',
      label: 'HCL',
      code: `variable "region" {
  type    = string
  default = "us-west-1"
}`,
    },
    {
      value: 'json',
      label: 'JSON',
      code: `{
  "message": "Hello, world!",
  "status": "success",
  "data": null
}`,
    },
    {
      value: 'sql',
      label: 'SQL',
      code: `SELECT 'Hello, world!';
SELECT 'Welcome to SQL!';
SELECT 'Enjoy coding!';`,
    },
    {
      value: 'yaml',
      label: 'YAML',
      code: `app_config:
  name: ExampleApp
  version: 1.0.0
  environment: production
  database:
    host: localhost
    port: 5432
    username: admin
    password: secret
    name: example_db`,
    },
    {
      value: 'hcl',
      label: 'HCL',
      code: `variable "region" {
  type    = string
  default = "us-west-1"
}`,
    },
  ];
}
