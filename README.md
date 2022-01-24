# fetch-image-proxy

> *An image, an image! My Kingdom for a header image!*
> 
> King Richard III, probably

Uses the wonderful npm package [open-graph-scraper](https://www.npmjs.com/package/open-graph-scraper) to fetch *some* image from a given URL. 

## Usage

I have a demo server running at `https://image.letterq.org/URL_TO_FETCH_IMAGE_FROM`

`URL_TO_FETCH_IMAGES_FROM` **must** be url encoded.

For example, the header image to this repo can be fetched like this: https://image.letterq.org/https%3A%2F%2Fgithub.com%2Fqcasey%2Ffetch-image-proxy

[Docker Image](https://hub.docker.com/repository/docker/qcasey1/fetch-image-proxy) is built automatically to run your own server.

## Implementation

The package prefers [open graph images](https://ogp.me/), but will fall back to the first inline `<img>` otherwise.

This API 302 redirects requests to the found image, so you can include it (with an errorBuilder) in components like:

```dart
final String url = "https://ogp.me/";
Image.network("https://image.letterq.org/${Uri.encodeComponent(url)}",
    loadingBuilder:
        (context, child, loadingProgress) {
        if (loadingProgress == null) return child;
        return CircularProgressIndicator();
    },
    errorBuilder: (context, error, stackTrace) =>
        Text("Could not load image"),
)),
```

## What works well

### URLs with premade open graph images
* [https://thebolditalic.com/this-colorized-1940s-clip-of-downtown-san-francisco-is-jaw-dropping-adc8d163b536](https://image.letterq.org/https%3A%2F%2Fthebolditalic.com%2Fthis-colorized-1940s-clip-of-downtown-san-francisco-is-jaw-dropping-adc8d163b536)
* [https://github.com/qcasey/fetch-image-proxy](https://image.letterq.org/https%3A%2F%2Fgithub.com%2Fqcasey%2Ffetch-image-proxy)

### URLs with img tags in the html
* [https://notes.eatonphil.com/bootloader-basics.html](https://image.letterq.org/https%3A%2F%2Fnotes.eatonphil.com%2Fbootloader-basics.html)
* [https://msrc-blog.microsoft.com/2022/01/20/an_armful_of_cheris/](https://image.letterq.org/https%3A%2F%2Fmsrc-blog.microsoft.com%2F2022%2F01%2F20%2Fan_armful_of_cheris%2F)

## What doesn't work

### Pages that require javascript before loading any html
* https://special.usps.com/testkits

## API Responses

* `405` when you didn't URL encode
* `404` when there aren't any images to fetch from the URL
* `302` redirect to the found image 