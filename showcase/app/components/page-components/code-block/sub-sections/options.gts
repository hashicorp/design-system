/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsCodeBlock } from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'active', 'focus'];

const SubSectionBaseElements: TemplateOnlyComponent = <template>
  <ShwTextH2>Options</ShwTextH2>

  <ShwTextH3>Standalone</ShwTextH3>

  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    <SG.Item @label="isStandalone=false">
      <HdsCodeBlock
        @isStandalone={{false}}
        @language="ruby"
        @ariaLabel="isStandalone=false"
        @value='Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/noble64"
end'
      />
    </SG.Item>
    <SG.Item @label="isStandalone=false, title and description">
      <HdsCodeBlock
        @value='Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/noble64"
end'
        @language="ruby"
        @isStandalone={{false}}
        as |CB|
      >
        <CB.Title>Title</CB.Title>
        <CB.Description>Description</CB.Description>
      </HdsCodeBlock>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Line wrapping</ShwTextH3>

  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    <SG.Item @label="hasLineWrapping=false (default)" @forceMinWidth={{true}}>
      <HdsCodeBlock
        @language="ruby"
        @ariaLabel="hasLineWrapping=false (default)"
        @value="codeLang='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam';"
      />
    </SG.Item>
    <SG.Item @label="hasLineWrapping=true" @forceMinWidth={{true}}>
      <HdsCodeBlock
        @language="ruby"
        @hasLineWrapping={{true}}
        @ariaLabel="hasLineWrapping=true"
        @value="codeLang='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam';"
      />
    </SG.Item>
    <SG.Item @label="hasLineWrapping=true with long string" @forceMinWidth={{true}}>
      <HdsCodeBlock
        @hasLineWrapping={{true}}
        @ariaLabel="hasLineWrapping=true with long string"
        @value="hcp-domain-verification=6ea52e476fc6232d974c31453dcd884a68df6cf374892a50a897c87d11125b67"
      />
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Line numbers</ShwTextH3>

  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    <SG.Item @label="hasLineNumbers=false">
      <HdsCodeBlock
        @language="go"
        @hasLineNumbers={{false}}
        @ariaLabel="hasLineNumbers=false"
        @value="package main
import 'fmt'
func main() {
  res = 'Lorem ipsum dolor sit amet'
  fmt.Println(res)
}"
      />
    </SG.Item>
    <SG.Item @label="hasLineNumbers=false, title and description">
      <HdsCodeBlock
        @language="go"
        @hasLineNumbers={{false}}
        @value="package main
import 'fmt'
func main() {
  res = 'Lorem ipsum dolor sit amet'
  fmt.Println(res)
}"
        as |CB|
      >
        <CB.Title>Title</CB.Title>
        <CB.Description>Description</CB.Description>
      </HdsCodeBlock>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Height limit</ShwTextH3>

  <ShwGrid @columns={{1}} @gap="2rem" as |SG|>
    <SG.Item @label="maxHeight='130px'" @forceMinWidth={{true}}>
      {{! template-lint-disable no-whitespace-for-layout }}
      <HdsCodeBlock
        @language="ruby"
        @maxHeight="130px"
        @ariaLabel="maxHeight='130px'"
        @value="def convert_object_to_array(obj)
  arr = obj.keys
           .map { |key| [key, obj[key]] }
           .flatten
           .sort
  return arr
end

def assert_objects_equal(actual, expected, test_name)
  actual_str = convert_object_to_array(actual).to_s
  expected_str = convert_object_to_array(expected).to_s
  puts 'ACTUAL: #{actual_str}  EXPECTED: #{expected_str}'
  if actual_str == expected_str
    puts 'passed'
  else
    puts 'FAILED [#{test_name}] Expected #{expected}, but got #{actual}'
  end
end"
      />
      {{! template-lint-enable no-whitespace-for-layout }}
    </SG.Item>

    <SG.Item
      @label="maxHeight='130px', title, description, and copy button, highlight lines 4 & 10"
      @forceMinWidth={{true}}
    >
      {{! template-lint-disable no-whitespace-for-layout }}
      <HdsCodeBlock
        @language="ruby"
        @maxHeight="130px"
        @hasCopyButton={{true}}
        @highlightLines="4, 10"
        @value="def convert_object_to_array(obj)
  arr = obj.keys
           .map { |key| [key, obj[key]] }
           .flatten
           .sort
  return arr
end

def assert_objects_equal(actual, expected, test_name)
  actual_str = convert_object_to_array(actual).to_s
  expected_str = convert_object_to_array(expected).to_s
  puts 'ACTUAL: #{actual_str}  EXPECTED: #{expected_str}'
  if actual_str == expected_str
    puts 'passed'
  else
    puts 'FAILED [#{test_name}] Expected #{expected}, but got #{actual}'
  end
end"
        as |CB|
      >
        <CB.Title>Title</CB.Title>
        <CB.Description>Description</CB.Description>
      </HdsCodeBlock>
      {{! template-lint-enable no-whitespace-for-layout }}
    </SG.Item>

    <SG.Item @label="maxHeight='130px', hasLineWrapping=true, highlight line 2" @forceMinWidth={{true}}>
      {{! template-lint-disable no-whitespace-for-layout }}
      <HdsCodeBlock
        @language="ruby"
        @maxHeight="130px"
        @hasLineNumbers={{true}}
        @hasLineWrapping={{true}}
        @highlightLines="2"
        @ariaLabel="maxHeight='130px', hasLineWrapping=true, highlight line 2"
        @value="def convert_object_to_array(obj)
  arr = obj.keys
           .map { |key| [key, obj[key]] }
           .flatten
           .sort
  return arr
end

def assert_objects_equal(actual, expected, test_name)
  actual_str = convert_object_to_array(actual).to_s
  expected_str = convert_object_to_array(expected).to_s
  puts 'ACTUAL: #{actual_str}  EXPECTED: #{expected_str}'
  if actual_str == expected_str
    puts 'passed'
  else
    puts 'FAILED [#{test_name}] Expected #{expected}, but got #{actual}'
  end
end"
      />
      {{! template-lint-enable no-whitespace-for-layout }}
    </SG.Item>

    <SG.Item @label="maxHeight='130px, hasLineNumbers=false" @forceMinWidth={{true}}>
      {{! template-lint-disable no-whitespace-for-layout }}
      <HdsCodeBlock
        @language="ruby"
        @maxHeight="130px"
        @hasLineNumbers={{false}}
        @ariaLabel="maxHeight='130px, hasLineNumbers=false"
        @value="def convert_object_to_array(obj)
  arr = obj.keys
           .map { |key| [key, obj[key]] }
           .flatten
           .sort
  return arr
end

def assert_objects_equal(actual, expected, test_name)
  actual_str = convert_object_to_array(actual).to_s
  expected_str = convert_object_to_array(expected).to_s
  puts 'ACTUAL: #{actual_str}  EXPECTED: #{expected_str}'
  if actual_str == expected_str
    puts 'passed'
  else
    puts 'FAILED [#{test_name}] Expected #{expected}, but got #{actual}'
  end
end"
      />
      {{! template-lint-enable no-whitespace-for-layout }}
    </SG.Item>

    <SG.Item @label="maxHeight='130px' with short content that does not overflow" @forceMinWidth={{true}}>
      <HdsCodeBlock
        @language="shell-session"
        @maxHeight="130px"
        @ariaLabel="maxHeight='130px' with short content that does not overflow"
        @value="$ brew tap hashicorp/tap"
      />
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Copy button</ShwTextH3>

  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    <SG.Item @label="hasCopyButton=true" @forceMinWidth={{true}}>
      <HdsCodeBlock
        @language="shell-session"
        @hasCopyButton={{true}}
        @ariaLabel="hasCopyButton=true"
        @value="$ brew tap hashicorp/tap"
      />
    </SG.Item>
    <SG.Item @label="hasCopyButton=true, maxHeight='130px', title and description" @forceMinWidth={{true}}>
      {{! template-lint-disable no-whitespace-for-layout }}
      <HdsCodeBlock
        id="clipboardTarget2"
        @hasCopyButton={{true}}
        @language="ruby"
        @maxHeight="130px"
        @value="def convert_object_to_array(obj)
  arr = obj.keys
           .map { |key| [key, obj[key]] }
           .flatten
           .sort
  return arr
end

def assert_objects_equal(actual, expected, test_name)
  actual_str = convert_object_to_array(actual).to_s
  expected_str = convert_object_to_array(expected).to_s
  puts 'ACTUAL: #{actual_str}  EXPECTED: #{expected_str}'
  if actual_str == expected_str
    puts 'passed'
  else
    puts 'FAILED [#{test_name}] Expected #{expected}, but got #{actual}'
  end
end"
        as |CB|
      >
        <CB.Title>Title</CB.Title>
        <CB.Description>Description</CB.Description>
      </HdsCodeBlock>
      {{! template-lint-enable no-whitespace-for-layout }}
    </SG.Item>
    <SG.Item @label="hasCopyButton=true with custom copySuccessMessageText" @forceMinWidth={{true}}>
      <HdsCodeBlock
        @language="shell-session"
        @hasCopyButton={{true}}
        @ariaLabel="hasCopyButton=true"
        @value="$ brew tap hashicorp/tap"
        @copySuccessMessageText="Yay! I'm a custom copy success message"
      />
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Highlight lines</ShwTextH3>

  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    <SG.Item @label="Highlight lines 2 & 4, hasLineNumbers=false" @forceMinWidth={{true}}>
      <HdsCodeBlock
        @language="go"
        @hasLineNumbers={{false}}
        @highlightLines="2, 4"
        @ariaLabel="Highlight lines 2 & 4, hasLineNumbers=false"
        @value="package main
import 'fmt'
func main() {
  res = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
  fmt.Println(res)
}"
      />
    </SG.Item>

    <SG.Item @label="Highlight lines 10-12" @forceMinWidth={{true}}>
      {{! template-lint-disable no-whitespace-for-layout }}
      <HdsCodeBlock
        @language="ruby"
        @highlightLines="10-12"
        @ariaLabel="Highlight lines 10-12"
        @value="def convert_object_to_array(obj)
  arr = obj.keys
           .map { |key| [key, obj[key]] }
           .flatten
           .sort
  return arr
end

def assert_objects_equal(actual, expected, test_name)
  actual_str = convert_object_to_array(actual).to_s
  expected_str = convert_object_to_array(expected).to_s
  puts 'ACTUAL: #{actual_str}  EXPECTED: #{expected_str}'
  if actual_str == expected_str
    puts 'passed'
  else
    puts 'FAILED [#{test_name}] Expected #{expected}, but got #{actual}'
  end
end"
      />
      {{! template-lint-enable no-whitespace-for-layout }}
    </SG.Item>
    <SG.Item @label="Highlight lines 14-17, lineNumberStart 2" @forceMinWidth={{true}}>
      {{! template-lint-disable no-whitespace-for-layout }}
      <HdsCodeBlock
        @language="ruby"
        @highlightLines="14-17"
        @lineNumberStart={{2}}
        @ariaLabel="Highlight lines 14-17, lineNumberStart 2"
        @value="def convert_object_to_array(obj)
  arr = obj.keys
           .map { |key| [key, obj[key]] }
           .flatten
           .sort
  return arr
end

def assert_objects_equal(actual, expected, test_name)
  actual_str = convert_object_to_array(actual).to_s
  expected_str = convert_object_to_array(expected).to_s
  puts 'ACTUAL: #{actual_str}  EXPECTED: #{expected_str}'
  if actual_str == expected_str
    puts 'passed'
  else
    puts 'FAILED [#{test_name}] Expected #{expected}, but got #{actual}'
  end
end"
      />
      {{! template-lint-enable no-whitespace-for-layout }}
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Language</ShwTextH3>

  <ShwGrid @columns={{2}} @gap="2rem" as |SG|>
    <SG.Item @label="no language (default)" @forceMinWidth={{true}}>
      <HdsCodeBlock
        @ariaLabel="no language (default)"
        @value="ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAklOUpkDHrfHY17SbrmTIpNLTGK9Tjom/BWDSU
GPl+nafzlHDTYW7hdI4yZ5ew18JH4JW9jbhUFrviQzM7xlELEVf4h9lFX5QVkbPppSwg0cda3
Pbv7kOdJ/MTyBlWXFCR+HAo3FXRitBqxiX1nKhXpHAZsMciLq8V6RjsNAQwdsdMFvSlVK/7XA
t3FaoJoAsncM1Q9x5+3V0Ww68/eIFmb1zuUFljQJKprrX88XypNDvjYNby6vw/Pb0rwert/En
mZ+AW4OZPnTPI89ZPmVMLuayrD2cE86Z/il8b+gw3r3+1nKatmIkjn2so1d01QraTlMqVSsbx
NrRFi9wrf+M7Q=="
      />
    </SG.Item>

    <SG.Item @label="bash" @forceMinWidth={{true}}>
      <HdsCodeBlock
        @language="bash"
        @ariaLabel="bash"
        @value="aws ec2 --region us-west-1 accept-vpc-peering-connection"
      />
    </SG.Item>

    <SG.Item @label="Go" @forceMinWidth={{true}}>
      <HdsCodeBlock
        @language="go"
        @ariaLabel="Go"
        @value="package main
import 'fmt'
func main() {
  fmt.Println('hello world')
}"
      />
    </SG.Item>

    <SG.Item @label="HashiCorp Configuration Language" @forceMinWidth={{true}}>
      {{! template-lint-disable no-whitespace-for-layout }}
      <HdsCodeBlock
        @language="hcl"
        @ariaLabel="HashiCorp Configuration Language"
        @value='variable "hvn_id" {
  description = "The ID of the HCP HVN."
  type        = string
  default     = "learn-hcp-vault-hvn"
}'
      />
      {{! template-lint-enable no-whitespace-for-layout }}
    </SG.Item>

    <SG.Item @label="JSON" @forceMinWidth={{true}}>
      {{! template-lint-disable no-whitespace-for-layout }}
      <HdsCodeBlock
        @language="json"
        @ariaLabel="JSON"
        @value='{
  "result": [
    {
      "expressions": [
        {
          "value": true,
          "text": "data.allow",
          "location": {
            "row": 1,
            "col": 1
          }
        }
      ]
    }
  ]
 }'
      />
      {{! template-lint-enable no-whitespace-for-layout }}
    </SG.Item>

    <SG.Item @label="log" @forceMinWidth={{true}}>
      {{! template-lint-disable no-whitespace-for-layout }}
      <HdsCodeBlock
        @language="log"
        @ariaLabel="log"
        @value='web_1            | USE_L10N =3D True
web_1            | USE_THOUSAND_SEPARATOR =3D False
web_1            | USE_TZ =3D True
web_1            | USE_X_FORWARDED_HOST =3D False
web_1            | USE_X_FORWARDED_PORT =3D False
web_1            | WSGI_APPLICATION =3D "context.wsgi.application"
web_1            | X_FRAME_OPTIONS =3D "SAMEORIGIN"
web_1            | YEAR_MONTH_FORMAT =3D "F Y"
web_1            |
web_1            |
web_1            |
web_1            | -------------------------------------------------------------------------------
web_1            | ERROR Internal Server Error: /api/v1/rides/
web_1            | Traceback (most recent call last):
web_1            |   File "/usr/local/lib/python3.6/site-packages/django/core/handlers/exception.py", line 34, in inner
web_1            |     response = get_response(request)
web_1            |   File "/usr/local/lib/python3.6/site-packages/django/core/handlers/base.py", line 126, in _get_response
web_1            |     response = self.process_exception_by_middleware(e, request)
web_1            |   File "/usr/local/lib/python3.6/site-packages/django/core/handlers/base.py", line 124, in _get_response
web_1            |     response = wrapped_callback(request, *callback_args, **callback_kwargs)
web_1            |   File "/usr/local/lib/python3.6/site-packages/django/views/decorators/csrf.py", line 54, in wrapped_view
web_1            |     return view_func(*args, **kwargs)
web_1            |   File "/usr/local/lib/python3.6/site-packages/rest_framework/viewsets.py", line 116, in view
web_1            |     return self.dispatch(request, *args, **kwargs)
web_1            |   File "/usr/local/lib/python3.6/site-packages/rest_framework/views.py", line 495, in dispatch
web_1            |     response = self.handle_exception(exc)
web_1            |   File "/usr/local/lib/python3.6/site-packages/rest_framework/views.py", line 455, in handle_exception
web_1            |     self.raise_uncaught_exception(exc)
web_1            |   File "/usr/local/lib/python3.6/site-packages/rest_framework/views.py", line 492, in dispatch
web_1            |     response = handler(request, *args, **kwargs)
web_1            |   File "/code/context/scooters/views.py", line 26, in list
web_1            |     } for x in query.model.Context.sources]
web_1            |   File "/code/context/scooters/views.py", line 26, in <listcomp>
web_1            |     } for x in query.model.Context.sources]
web_1            | TypeError: source() takes 1 positional argument but 2 were given
web_1            | [13/Jun/2019 02:54:33] "GET /api/v1/rides/ HTTP/1.1" 500 90495'
      />
      {{! template-lint-enable no-whitespace-for-layout }}
    </SG.Item>

    <SG.Item @label="Shell" @forceMinWidth={{true}}>
      <HdsCodeBlock @language="shell-session" @ariaLabel="Shell" @value="$ brew tap hashicorp/tap" />
    </SG.Item>

    <SG.Item @label="YAML" @forceMinWidth={{true}}>
      <HdsCodeBlock
        @language="yaml"
        @ariaLabel="YAML"
        @value="---
result:
- expressions:
  - value: true
    text: data.allow
    location:
      row: 1
      col: 1
"
      />
    </SG.Item>

    <SG.Item @label="Ruby" @forceMinWidth={{true}}>
      <HdsCodeBlock
        @language="ruby"
        @ariaLabel="Ruby"
        @value='Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/noble64"
end'
      />
    </SG.Item>

    <SG.Item @label="Invalid language (foo)" @forceMinWidth={{true}}>
      {{! template-lint-disable no-whitespace-for-layout }}
      <HdsCodeBlock
        {{! @glint-expect-error - testing what happens with an invalid language }}
        @language="foo"
        @ariaLabel="Invalid language (foo)"
        @value='variable "hvn_id" {
  description = "The ID of the HCP HVN."
  type        = string
  default     = "learn-hcp-vault-hvn"
}'
      />
      {{! template-lint-enable no-whitespace-for-layout }}
    </SG.Item>
  </ShwGrid>
</template>;

export default SubSectionBaseElements;