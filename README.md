# tts-loader

Very basic Webpack loader for text-to-speech.

This loader uses macOS's text-to-speech functionality to generate an MP3 with the contents of a passed-in text file.

## Requirements

Since this uses functionality built into macOS (f/k/a OS X), a Mac is required. This was developed and tested on Sierra,
but should work on any version of macOS or OS X.

In addition to the standard Webpack requirements, ffmpeg is required. It's easiest installed with
[Homebrew](https://brew.sh):

`brew install ffmpeg`

## License

MIT license. See LICENSE.