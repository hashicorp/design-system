export default function normalisePath(path, pages) {
  // walk the structure of the pages object to find any matching indexes
  function walkPages(path, pages) {
    if (pages) {
      if (pages.find((page) => page.id === `${path}/index`)) {
        return true;
      }

      // if any of the nested pages have a matching page (recursive)
      return pages.find((page) => {
        if (page.pages) {
          return walkPages(path, page.pages);
        }
      });
    }
  }

  if (walkPages(path, pages)) {
    return `${path}/index`;
  }

  return path;
}
