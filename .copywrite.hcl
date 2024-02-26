schema_version = 1

project {
  license        = "MPL-2.0"
  copyright_year = 2021

  # (OPTIONAL) A list of globs that should not have copyright/license headers.
  # Supports doublestar glob patterns for more flexibility in defining which
  # files or folders should be ignored
  header_ignore = [
    # Generic configuration files
    "**/*.yml",
    "**/*.cjs",
    "**/*rc.js",
    # Distribution files
    "**/dist/**",
    # SVG icons packed as `tsx` files
    "packages/flight-icons/svg-react/*",
    # Handlebars components sensitive to white-space
    "packages/components/src/components/hds/interactive/*.hbs",
    "packages/components/src/components/hds/link/*.hbs",
    # Reworked from `field-guide` and `broccoli-static-site-json`
    "website/app/components/dynamic-template-error.hbs",
    "website/app/components/dynamic-template-error.js",
    "website/app/components/dynamic-template.hbs",
    "website/app/components/dynamic-template.js",
    "website/app/initializers/showdown-extensions.js",
    "website/app/routes/application.js",
    "website/app/routes/show.js",
    "website/app/controllers/show.js",
    "website/app/templates/show.hbs",
    "website/lib/markdown/index.js",
    "website/lib/markdown/markdown-to-jsonapi.js",
    "website/lib/markdown/table-of-contents.js",
  ]
}
