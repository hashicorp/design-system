/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';

import { HdsCodeEditor } from '@hashicorp/design-system-components/components';

const LANGUAGE_SNIPPETS = [
  {
    value: 'rego',
    label: 'Rego',
    code: `package example.test
import data.users

default allow = false

# single-line comment

allow with data.something as foo {
  some i in input.paths
  not forbidden
  time.now() >= /* inline block comment */ 1672531200
}

deny { base64.decode(input.encoded) == "decoded" }
`,
  },
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
    value: 'javascript',
    label: 'JavaScript',
    code: `const message = 'Hello, world!';

function sayMessage() {
  console.log(message);
}

sayMessage();
`,
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
    value: 'markdown',
    label: 'Markdown',
    code: `# Heading Example

This is **bold**, *italic*, and \`monospace\`.
A [link](https://example.com) and a \`code snippet\`.

> A blockquote example.

- List item 1
- List item 2
`,
  },
  {
    value: 'sentinel',
    label: 'Sentinel',
    code: `param allowed_regions = ["us-east-1", "us-west-2"]

main = rule { all tfplan.resources[*].instances as r { r.attributes.region in allowed_regions } }
`,
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
] as const;

const SubSectionSyntaxHighlighting: TemplateOnlyComponent = <template>
  <ShwTextH2>Syntax highlighting</ShwTextH2>
  <ShwFlex @direction="column" as |SF|>
    {{#each LANGUAGE_SNIPPETS as |lang|}}
      <SF.Item @label={{lang.label}}>
        <HdsCodeEditor @language={{lang.value}} @value={{lang.code}} as |CE|>
          <CE.Title>{{lang.label}}</CE.Title>
        </HdsCodeEditor>
      </SF.Item>
    {{/each}}
  </ShwFlex>
</template>;

export default SubSectionSyntaxHighlighting;
