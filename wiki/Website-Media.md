# Website / Media


- [Website / Media](#website--media)
  - [Where to store the media files](#where-to-store-the-media-files)
  - [Where to find the source for the media files](#where-to-find-the-source-for-the-media-files)
  - [How to export the files](#how-to-export-the-files)
  - [Optimizing images](#optimizing-images)
  - [Adding and optimizing video assets](#adding-and-optimizing-video-assets)

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

Prior to adding new images to the website the assets should be optimized to reduce their file size and increase our web performance. Figma's export feature doesn't allow for much fine-grained control regarding image quality and optimizing for speed on the web. [ImageOptim](https://imageoptim.com) works great, is free, easy to use, and with the correct settings can result in a more than _50% reduction_ in file size per image.

1. Install the desktop app for your specific operating system.
2. Open the application settings; generally most of the default settings work out of the box, but for reference:
    1. In the quality tab, enable `Lossy minification`
    2. Set the image qualities for .jpg, .png, and .gif to 85-90%. This results in a high quality, high resolution image (using the guidelines outlined above), while removing unnecessary metadata and compressing the filesize to something more managable for the web.
3. Within the app, either add images to the queue with the plus icon in the lower left corner, or simply drag and drop files from your file browser into the window.

Once added to the queue assets will be optimized automatically and rather than exporting fundamentally new assets, ImageOptim automatically saves compressed assets to the same location in the filesystem. **Warning:** This does overwrite the original file.

## Adding and optimizing video assets

Including video examples and prototypes in documentation can help to express complex concepts in a step-by-step manner, but these types of assets require a bit more work to create and subsequently include in markdown. 

_Video assets (.mp4, .mov, etc) aren't directly supported by markdown, for more details on how to include them in documentation view the [markdown documentation](/wiki/Website-Markdown.md)._

These steps are specific to using either Adobe After Effects or Premiere along with Adobe Media Encoder for rendering.

These steps are focused on _rendering_ a video asset for use on the web using Adobe Media Encoder. More complex examples (creating a custom UI in After Effects, more in-depth editing, etc) are beyond the scope of this guide.

1. Create your source video asset; the most straightforward method is to record your screen with Quicktime's native screen recording feature either showing an in-browser example, or Figma prototype.
2. After launching Media Encoder, add your asset to the render queue.
    1. In After Effects this can be done through the "Composition" menu and selecting "Add to Media Encoder Render Queue…" (shortcut `Alt` + `Cmd` + `m`).
    2. In Premiere this can be done through the "File" menu, Export -> Send to Adobe Media Encoder (shortcut `Cmd` + `Shift` + `m`) .
    3. If adding directly to Media Encoder, click the `+` button in the Queue panel to "Add source".
3. Click the Format of the asset to access Export Settings.

![Open export settings](/wiki/images/open-export-settings.png)

4. Under the Export Settings, select a format of H.264 which results in a `.mp4` file which is appropriate for web. You can also optionally select the output location and name of the rendered asset.

![Export settings](/wiki/images/video-export-settings.png)

5. Under "Basic Video Settings" in the Export Settings window, set the width of the rendered asset to 1200px or less and the frame rate to 15 fps. The width might depend on original asset, but I've found that his is a happy medium for file size and quality.

![Basic video settings](/wiki/images/basic-video-settings.png)

6. With all of these settings applied, clicking the triangle at the top of the render queue will kick off the rendering process and will proceed all files in the queue (if there are more than one).