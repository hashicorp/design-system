/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';

import {
  HdsTime,
  HdsTextBody,
} from '@hashicorp/design-system-components/components';

const SubSectionInContext: TemplateOnlyComponent = <template>
  <ShwTextH2>Used in context</ShwTextH2>

  <ShwFlex @gap="2rem" @direction="column" as |SF|>
    <SF.Item @label="Single date with tooltip">
      <HdsTextBody @tag="p">
        HashiConf 2024 ended
        <HdsTime @date="16 October 2024" @display="relative" />.
      </HdsTextBody>
    </SF.Item>

    <SF.Item @label="Single date without tooltip">
      <HdsTextBody @tag="p">
        HashiConf 2024 ended
        <HdsTime
          @date="16 October 2024"
          @display="relative"
          @hasTooltip={{false}}
        />.
      </HdsTextBody>
    </SF.Item>

    <SF.Item @label="Date range with tooltip">
      <HdsTextBody @tag="p">
        HashiConf is from
        <HdsTime @startDate="14 October 2024" @endDate="16 October 2024" />.
      </HdsTextBody>
    </SF.Item>

    <SF.Item @label="Date range without tooltip">
      <HdsTextBody @tag="p">
        HashiConf is from
        <HdsTime
          @startDate="14 October 2024"
          @endDate="16 October 2024"
          @hasTooltip={{false}}
        />.
      </HdsTextBody>
    </SF.Item>

    <SF.Item @label="Examples within long paragraph">
      <HdsTextBody @tag="p">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. HashiConf 2024
        ended
        <HdsTime @date="16 October 2024" @display="relative" />. Sequi officia
        sunt ad veniam eveniet voluptate quis debitis laudantium qui porro, iste
        numquam iure repellendus eum fugit obcaecati unde. Odit, laboriosam.
        Illum architecto, harum velit nobis ut id fugit voluptatibus dolores et
        at ab ullam veritatis aperiam natus quas distinctio, obcaecati,
        reiciendis eius odio corrupti quam dolorum molestias quisquam. Maiores,
        facere? Culpa, corporis HashiConf 2024 ended
        <HdsTime @date="16 October 2024" @display="relative" />. quibusdam
        consectetur quidem, et molestiae iusto dignissimos fugit blanditiis, hic
        iure totam sit earum esse ex quam aliquam eaque praesentium error ipsa
        illum quisquam rem! Numquam, modi dolores! Animi, doloribus, sit optio
        quo perferendis facere aliquid nesciunt repellendus rerum officia
        delectus reprehenderit quasi eius, ad pariatur facilis dolorem
        voluptatibus labore? Ab fugiat ducimus quos ullam sequi veniam iste.
        Impedit nostrum fugit, soluta facilis ex eveniet officiis deleniti unde
        voluptas blanditiis aliquam rem recusandae magnam ipsum minus assumenda,
        ipsam obcaecati! Excepturi eligendi nemo veniam iusto ducimus dicta est
        reprehenderit? Quia expedita harum aspernatur neque voluptatum? Commodi
        incidunt, quas ad labore minima a corporis, maxime sit soluta ex
        consequatur illo doloribus? Ipsum facere ullam ipsam inventore quisquam
        suscipit dolores quos? HashiConf is from
        <HdsTime @startDate="14 October 2024" @endDate="16 October 2024" />.
        Natus neque obcaecati laudantium voluptates sapiente dolore, corrupti
        exercitationem omnis nulla distinctio modi quam, laborum porro mollitia
        consequuntur illum officia in. Ea, excepturi repudiandae distinctio
        animi itaque aperiam deleniti laborum! Quo sequi cumque illo debitis,
        nam excepturi tenetur deleniti enim non maxime incidunt eum cupiditate
        optio repudiandae, illum ipsum. Voluptas aperiam magni, minus recusandae
        quos molestiae soluta qui eum tenetur? Voluptatum mollitia, illo, quam
        voluptate dolore facilis similique eum ad ducimus laudantium voluptates
        at consequuntur in quod deserunt! Quas, omnis animi at ullam deserunt
        deleniti odio iusto distinctio saepe culpa? HashiConf is from
        <HdsTime
          @startDate="14 October 2024"
          @endDate="16 October 2024"
          @hasTooltip={{false}}
        />. Quod animi quam, tempora aliquid voluptas porro deleniti quo
        pariatur libero voluptates voluptatum rerum laboriosam veritatis qui
        natus nam ratione in deserunt blanditiis aliquam. Mollitia ipsam quaerat
        quam eveniet cumque! Porro cupiditate voluptate dignissimos, nemo
        eveniet ex, nam delectus exercitationem dolore tempore possimus
        doloremque error! Ipsa nostrum nesciunt id! Consequuntur dolorum
        pariatur laudantium libero harum iure, ipsa voluptatibus natus nesciunt.
        Deserunt dignissimos reprehenderit id error iste ea aut eius, labore,
        molestias, non dolorum maxime beatae. Et nulla dignissimos obcaecati qui
        explicabo aut, vitae delectus quam similique velit nam eius inventore.
        Voluptatibus fuga veniam nobis, minima dicta impedit fugit delectus
        dolores corrupti sequi earum velit officia voluptatum nostrum aut quam
        commodi, optio iusto cupiditate animi ea rerum! In ipsa facilis
        deleniti.
      </HdsTextBody>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionInContext;
