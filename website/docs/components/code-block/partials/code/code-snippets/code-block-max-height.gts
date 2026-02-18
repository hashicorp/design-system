import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsCodeBlock } from '@hashicorp/design-system-components/components';

const LocalComponent: TemplateOnlyComponent = <template>
  {{! template-lint-disable no-whitespace-for-layout }}
  <HdsCodeBlock
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
    <CB.Title>
      CodeBlock title
    </CB.Title>
    <CB.Description>
      CodeBlock description
    </CB.Description>
  </HdsCodeBlock>
</template>;

export default LocalComponent;
