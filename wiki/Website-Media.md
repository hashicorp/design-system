# Website / Media


- [Website / Media](#website--media)
  - [Where to store the media files](#where-to-store-the-media-files)
  - [Where to find the source for the media files](#where-to-find-the-source-for-the-media-files)
  - [How to export the files](#how-to-export-the-files)

---

## Where to store the media files

At the time of writing, the only way for a markdown file to "consume" an image (or media file in general) is if the image is stored in the `website/public` folder, which is cloned at build time into the `dist` folder. It's not super ergonomic, and we're considering the possibility to change our build pipeline so that relative paths to images are allowed (and work as expected), but at the moment is still considered a non-blocking improvement.

## Where to find the source for the media files

All the assets used in the website are collected under [the Figma file "Website assets"](https://www.figma.com/file/42LK10XbP5IERhzzgMOiI2/Website-assets?node-id=0%3A1&t=xf7eqxGJEBopQM5d-0).

Please add the original source of every image or illustration that you add to the documentation, so that it's easy to find and change if necessary.

## How to export the files

As mentioned above, the generated files should be exported in the `website/public` folder.

Regarding the format and settings of the "Export" panel in Figma, please follow these guidelines:

- assets should be ready to be exported as they are, without the need for someone to do something
  - give them frame the exact name that will be used in the code
    - no uppercase, no space, no slash, no special characters (eg. `this-is-my-file`)
    - choose how the asset should be exported: the resolution (generally will be `@2x`) and the format (`SVG`, `PNG`, `JPG`, depending on the context)
      - consider the content of the image
        - it’s just vectors, with normal paths? probably an `SVG` is best
        - it’s vectors, but with thousands of points? export in `SVG` and `PNG` and compare the size, then choose
        - it’s both vectors and bitmap (eg. the new illustrations)? then `JPG` is the one that compress better
  - decide if the frame should be clipped or not (generally is not necessary if it’s `SVG`, but if it’s `JPG` is better because in some cases it may create visual artifacts on the borders)
    - ![The "Frame" panel in Figma with the "Clip content" option selected](images/doc-figma-clip-content.png)
  - decide if the background color applied to the frame should be exported or not (if it’s `SVG` almost certainly not, if it’s `PNG` or `JPG` almost certainly yes)
    - ![The "Fill" panel in Figma with the "Show in exports" option selected](images/doc-figma-show-in-exports.png)
- consider the frame size in relation to what is the real use case
  - is it a fixed size in the page? use the exact same size (and export at `@2x`)
  - is it an image that resizes when the viewport changes? speak with the developer and decide what is the right size to use

If you have any doubts or problems exporting the files, speak with one of the designers of the HDS team.

## Optimizing images

While not required, it's highly recommended that image assets be optimized prior to including them on the website. Figma's export feature doesn't allow for much fine-grained control regarding image quality and optimizing for speed on the web.

There are many freely available tools for image optimization, we recommend using [ImageOptim](https://imageoptim.com) because it's free, super easy to use, and with the correct settings can result in a more than _50% reduction_ in file size per image.

1. Install the desktop app for your specific operating system.
2. Open the application settings; generally most of the default settings work well out of the box, but for reference:
    1. In the quality tab, enable `Lossy minification`
    2. Set the image qualities for .jpg, .png, and .gif to 85-90%. This results in a high quality, high resolution image (using the guidelines outlined above), and removes a lot of the unnecessary metadata and compresses the filesize to something more managable for the web.
3. Within the app, either add images to the queue with the plus icon in the lower left corner, or simply drag and drop files from your file browser into the window.

ImageOptim works well because rather than importing and subsequently exporting fundamentally new files, it automatically saves compressed files to the same location in the filesystem. **Warning:** This does overwrite the original file.

## Adding and optimizing video assets

Adding video prototypes and examples to documentation can be helpful at expressing a complex concept in a step-by-step manner, though, getting these assets added to the website isn't a bit less straightforward.

While not required, using a timeline-based editor like After Effects, Premiere, or Final Cut can be very helpful when creating these assets. This process will specifically detail how to create a video asset suitable for web in Adobe After Effects.

1. Create your source video asset; this is easily done by recording your screen with Quicktime's native screen recording feature to record a browser window or Figma prototype. A custom UI can also be built in After Effects and rendered directly, but this requires more than a basic understanding of timeline-based editors and is beyond what this guide can cover.
2. While it doesn't really 