#!/bin/bash
# Create a minimal showcase app for benchmarking bundle size
# This strips down to only the demo-full-app-frame-with-app-header-and-app-side-nav page

set -e

cd "$(dirname "$0")"

echo "Creating minimal showcase for bundle size benchmarking..."

# Backup original files
mkdir -p .benchmark-backup
cp app/router.ts .benchmark-backup/
cp app/templates/application.gts .benchmark-backup/
cp app/templates/index.gts .benchmark-backup/

# Create minimal router
cat > app/router.ts << 'EOF'
/**
 * Minimal router for bundle size benchmarking
 */

import EmberRouter from '@ember/routing/router';
import config from 'showcase/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('page-layouts', { path: 'layouts' }, function () {
    this.route('app-frame', function () {
      this.route('frameless', function () {
        this.route('demo-full-app-frame-with-app-header-and-app-side-nav');
      });
    });
  });
});
EOF

# Create minimal index that redirects
cat > app/templates/index.gts << 'EOF'
/**
 * Minimal index for bundle benchmarking - redirects to the demo page
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { LinkTo } from '@ember/routing';

const Index: TemplateOnlyComponent = <template>
  <div style="padding: 2rem;">
    <h1>Minimal Benchmark Showcase</h1>
    <p>
      <LinkTo @route="page-layouts.app-frame.frameless.demo-full-app-frame-with-app-header-and-app-side-nav">
        Go to App Frame Demo →
      </LinkTo>
    </p>
  </div>
</template>;

export default Index;
EOF

# Create minimal application template
cat > app/templates/application.gts << 'EOF'
/**
 * Minimal application template for bundle benchmarking
 */
import Component from '@glimmer/component';
import { pageTitle } from 'ember-page-title';
import { inject as service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';

export default class Application extends Component {
  @service declare readonly router: RouterService;

  get isFrameless() {
    return this.router?.currentURL?.includes('frameless') ?? false;
  }

  <template>
    {{pageTitle "Showcase - Benchmark"}}

    {{#if this.isFrameless}}
      {{outlet}}
    {{else}}
      <main class="shw-main">
        {{outlet}}
      </main>
    {{/if}}
  </template>
}
EOF

echo "✅ Minimal showcase created!"
echo ""
echo "Components included:"
echo "  - HdsAppFrame"
echo "  - HdsAppHeader (+ HdsAppHeaderHomeLink)"
echo "  - HdsAppSideNav (+ HdsAppSideNavList)"
echo "  - HdsAppFooter"
echo "  - HdsPageHeader"
echo "  - HdsAlert"
echo "  - HdsBadge"
echo "  - HdsBreadcrumb"
echo "  - HdsButton"
echo "  - HdsDropdown"
echo "  - HdsFormToggleField"
echo "  - HdsLinkInline"
echo "  - HdsText (Display, Body)"
echo ""
echo "To run benchmark: node benchmark.mjs minimal benchmark-minimal.json"
echo "To restore: ./restore-full-showcase.sh"
