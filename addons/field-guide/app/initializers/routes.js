/* eslint-disable prettier/prettier */
import Router from '../router';

export function initialize() {
  Router.map(function() {
    this.route('show', { path: '*path' });
  });
}

export default {
  initialize
};
