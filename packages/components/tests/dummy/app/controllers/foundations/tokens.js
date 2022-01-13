import Controller from '@ember/controller';

export default class TokensController extends Controller {
  get tokensList() {
    // type Token = {
    //   value: string;
    //   type?: string;
    //   group?: string;
    //   comment?: string;
    //   documentation?: {
    //     comment: string;
    //   };
    //   original: {
    //     value: string;
    //     type?: string;
    //     group?: string;
    //     comment?: string;
    //   };
    //   name: string;
    //   attributes: {
    //     category: string;
    //     type?: string;
    //     item?: string;
    //   };
    //   path: string[];
    // };

    const tokensList = {};

    this.model.TOKENSJSON.forEach((token) => {
      const category = token.attributes.category;
      if (!tokensList[category]) {
        tokensList[category] = [];
      }
      tokensList[category].push(token);
    });

    return tokensList;
  }
}
