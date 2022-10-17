export function replaceLinkToDocsPages(hbsSource: string): string {
  // replace the opening <LinkTo>
  hbsSource = hbsSource.replace(/<LinkTo @route="(.*?)">/g, (_match, route) => {
    // IMPORTANT: here we assume that the "index" page of a component is "01_overview", but this may not be true!
    return `<a href="/${route.replace(/\./g, '/')}/01--overview/">`;
  });

  // replace the closing </LinkTo>
  hbsSource = hbsSource.replace(/<\/LinkTo>/g, '</a>');

  return hbsSource;
}
