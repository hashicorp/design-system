import DocA11ySupport from '../app/components/doc/a11y-support';
import DocBadge from '../app/components/doc/badge';
import DocBadgeGroup from '../app/components/doc/badge-group';
import DocBanner from '../app/components/doc/banner';
import DocCardsCard from '../app/components/doc/cards/card';
import DocCardsDeck from '../app/components/doc/cards/deck';
import DocCodeGroup from '../app/components/doc/code-group';
import DocColorCard from '../app/components/doc/color-card';
import DocColorSwatch from '../app/components/doc/color-swatch';
import DocComponentApi from '../app/components/doc/component-api';
import DocComponentApiProperty from '../app/components/doc/component-api/property';
import DocContentHdsPrinciples from '../app/components/doc/content/hds-principles';
import DocCopyButton from '../app/components/doc/copy-button';
import DocDoDont from '../app/components/doc/do-dont';
import DocFontHelpersList from '../app/components/doc/font-helpers-list';
import DocFormFilter from '../app/components/doc/form/filter';
import DocFormLabel from '../app/components/doc/form/label';
import DocFormSelectGroupType from '../app/components/doc/form/select-group-type';
import DocFormSelect from '../app/components/doc/form/select';
import DocIconsListGrid from '../app/components/doc/icons-list/grid';
import DocIconsListItem from '../app/components/doc/icons-list/item';
import DocIconsList from '../app/components/doc/icons-list';
import DocImageCaption from '../app/components/doc/image-caption';
import DocLayout from '../app/components/doc/layout';
import DocLinkWithIcon from '../app/components/doc/link-with-icon';
import DocLogoDesignSystem from '../app/components/doc/logo/design-system';
import DocLogoHashiCorp from '../app/components/doc/logo/hashi-corp';
import DocMetaRow from '../app/components/doc/meta-row';
import DocNpmVersion from '../app/components/doc/npm-version';
import DocPageHeaderAlgoliaSearch from '../app/components/doc/page/header/algolia-search';
import DocPageHeader from '../app/components/doc/page/header';
import DocPageHeaderNavItem from '../app/components/doc/page/header/nav-item';
import DocPageBanner from '../app/components/doc/page/banner';
import DocPageContent from '../app/components/doc/page/content';
import DocPageCover from '../app/components/doc/page/cover';
import DocPageFooter from '../app/components/doc/page/footer';
import DocPageSidebar from '../app/components/doc/page/sidebar';
import DocPageSidecar from '../app/components/doc/page/sidecar';
import DocPageStage from '../app/components/doc/page/stage';
import DocPageTabs from '../app/components/doc/page/tabs';
import DocPlaceholder from '../app/components/doc/placeholder';
import DocRelatedComponents from '../app/components/doc/related-components';
import DocScrollToTop from '../app/components/doc/scroll-to-top';
import DocTableOfContents from '../app/components/doc/table-of-contents';
import DocTableOfContentsCollapsibleItem from '../app/components/doc/table-of-contents/collapsible-item';
import DocTokenPreview from '../app/components/doc/token-preview';
import DocTokensList from '../app/components/doc/tokens-list';
import DocTokensListGrid from '../app/components/doc/tokens-list/grid';
import DocTokensListItem from '../app/components/doc/tokens-list/item';
import DocVarsList from '../app/components/doc/vars-list';
import DocWcagList from '../app/components/doc/wcag-list';

import DynamicTemplateError from '../app/components/dynamic-template-error';
import DynamicTemplate from '../app/components/dynamic-template';

export default interface WebsiteTemplateRegistry {
  // DOC COMPONENTS
  'Doc::A11ySupport': typeof DocA11ySupport;
  'doc/a11y-support': typeof DocA11ySupport;

  'Doc::Badge': typeof DocBadge;
  'doc/badge': typeof DocBadge;

  'Doc::BadgeGroup': typeof DocBadgeGroup;
  'doc/badge-group': typeof DocBadgeGroup;

  'Doc::Banner': typeof DocBanner;
  'doc/banner': typeof DocBanner;

  'Doc::Cards::Card': typeof DocCardsCard;
  'doc/cards/card': typeof DocCardsCard;

  'Doc::Cards::Deck': typeof DocCardsDeck;
  'doc/cards/deck': typeof DocCardsDeck;

  'Doc::CodeGroup': typeof DocCodeGroup;
  'doc/code-group': typeof DocCodeGroup;

  'Doc::ColorCard': typeof DocColorCard;
  'doc/color-card': typeof DocColorCard;

  'Doc::ColorSwatch': typeof DocColorSwatch;
  'doc/color-swatch': typeof DocColorSwatch;

  'Doc::ComponentApi': typeof DocComponentApi;
  'doc/component-api': typeof DocComponentApi;

  'Doc::ComponentApi::Property': typeof DocComponentApiProperty;
  'doc/component-api/property': typeof DocComponentApiProperty;

  'Doc::Content::HdsPrinciples': typeof DocContentHdsPrinciples;
  'doc/content/hds-principles': typeof DocContentHdsPrinciples;

  'Doc::CopyButton': typeof DocCopyButton;
  'doc/copy-button': typeof DocCopyButton;

  'Doc::DoDont': typeof DocDoDont;
  'doc/do-dont': typeof DocDoDont;

  'Doc::FontHelpersList': typeof DocFontHelpersList;
  'doc/font-helpers-list': typeof DocFontHelpersList;

  'Doc::Form::Filter': typeof DocFormFilter;
  'doc/form/filter': typeof DocFormFilter;

  'Doc::Form::Label': typeof DocFormLabel;
  'doc/form/label': typeof DocFormLabel;

  'Doc::Form::SelectGroupType': typeof DocFormSelectGroupType;
  'doc/form/select-group-type': typeof DocFormSelectGroupType;

  'Doc::Form::Select': typeof DocFormSelect;
  'doc/form/select': typeof DocFormSelect;

  'Doc::IconsList::Grid': typeof DocIconsListGrid;
  'doc/icons-list/grid': typeof DocIconsListGrid;

  'Doc::IconsList::Item': typeof DocIconsListItem;
  'doc/icons-list/item': typeof DocIconsListItem;

  'Doc::IconsList': typeof DocIconsList;
  'doc/icons-list': typeof DocIconsList;

  'Doc::ImageCaption': typeof DocImageCaption;
  'doc/image-caption': typeof DocImageCaption;

  'Doc::Layout': typeof DocLayout;
  'doc/layout': typeof DocLayout;

  'Doc::LinkWithIcon': typeof DocLinkWithIcon;
  'doc/link-with-icon': typeof DocLinkWithIcon;

  'Doc::Logo::DesignSystem': typeof DocLogoDesignSystem;
  'doc/logo/design-system': typeof DocLogoDesignSystem;

  'Doc::Logo::HashiCorp': typeof DocLogoHashiCorp;
  'doc/logo/hashi-corp': typeof DocLogoHashiCorp;

  'Doc::MetaRow': typeof DocMetaRow;
  'doc/meta-row': typeof DocMetaRow;

  'Doc::NpmVersion': typeof DocNpmVersion;
  'doc/npm-version': typeof DocNpmVersion;

  'Doc::Page::Header::AlgoliaSearch': typeof DocPageHeaderAlgoliaSearch;
  'doc/page/header/algolia-search': typeof DocPageHeaderAlgoliaSearch;

  'Doc::Page::Header::NavItem': typeof DocPageHeaderNavItem;
  'doc/page/header/nav-item': typeof DocPageHeaderNavItem;

  'Doc::Page::Header': typeof DocPageHeader;
  'doc/page/header': typeof DocPageHeader;

  'Doc::Page::Banner': typeof DocPageBanner;
  'doc/page/banner': typeof DocPageBanner;

  'Doc::Page::Content': typeof DocPageContent;
  'doc/page/content': typeof DocPageContent;

  'Doc::Page::Cover': typeof DocPageCover;
  'doc/page/cover': typeof DocPageCover;

  'Doc::Page::Footer': typeof DocPageFooter;
  'doc/page/footer': typeof DocPageFooter;

  'Doc::Page::Sidebar': typeof DocPageSidebar;
  'doc/page/sidebar': typeof DocPageSidebar;

  'Doc::Page::Sidecar': typeof DocPageSidecar;
  'doc/page/sidecar': typeof DocPageSidecar;

  'Doc::Page::Stage': typeof DocPageStage;
  'doc/page/stage': typeof DocPageStage;

  'Doc::Page::Tabs': typeof DocPageTabs;
  'doc/page/tabs': typeof DocPageTabs;

  'Doc::Placeholder': typeof DocPlaceholder;
  'doc/placeholder': typeof DocPlaceholder;

  'Doc::RelatedComponents': typeof DocRelatedComponents;
  'doc/related-components': typeof DocRelatedComponents;

  'Doc::ScrollToTop': typeof DocScrollToTop;
  'doc/scroll-to-top': typeof DocScrollToTop;

  'Doc::TableOfContents': typeof DocTableOfContents;
  'doc/table-of-contents': typeof DocTableOfContents;

  'Doc::TableOfContentsCollapsibleItem': typeof DocTableOfContentsCollapsibleItem;
  'doc/table-of-contents-collapsible-item': typeof DocTableOfContentsCollapsibleItem;

  'Doc::TokenPreview': typeof DocTokenPreview;
  'doc/token-preview': typeof DocTokenPreview;

  'Doc::TokensList': typeof DocTokensList;
  'doc/tokens-list': typeof DocTokensList;

  'Doc::TokensList::Grid': typeof DocTokensListGrid;
  'doc/tokens-list/grid': typeof DocTokensListGrid;

  'Doc::TokensList::Item': typeof DocTokensListItem;
  'doc/tokens-list/item': typeof DocTokensListItem;

  'Doc::VarsList': typeof DocVarsList;
  'doc/vars-list': typeof DocVarsList;

  'Doc::WcagList': typeof DocWcagList;
  'doc/wcag-list': typeof DocWcagList;

  // DYNAMIC TEMPLATE COMPONENTS
  DynamicTemplateError: typeof DynamicTemplateError;
  'dynamic-template-error': typeof DynamicTemplateError;

  DynamicTemplate: typeof DynamicTemplate;
  'dynamic-template': typeof DynamicTemplate;
}
