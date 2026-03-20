import Component from '@glimmer/component';

import POLICY_DATA from 'website/mocks/policy-data';

export default class LocalComponent extends Component {
  get myDemoData() {
    // example of data retrieved for the model:
    // [
    //   {
    //     id: "1",
    //     name: "Policy set 1",
    //     status: "PASS",
    //     children: [
    //       {
    //         name: "test-advisory-pass.sentinel",
    //         status: "PASS",
    //         description: "Sample description for this thing.",
    //       },
    //       {
    //         name: "test-hard-mandatory-pass.sentinel",
    //         status: "PASS",
    //         description: "Sample description for this thing.",
    //       },
    //     ],
    //   },
    //   {
    //     id: "2",
    //     name: "Policy set 2",
    //     status: "FAIL",
    //     children: [
    //       {
    //         name: "test-advisory-pass.sentinel",
    //         status: "PASS",
    //         description: "Sample description for this thing.",
    //       },
    //       // ...
    //     ],
    //   },
    // ];

    return POLICY_DATA;
  }
}
