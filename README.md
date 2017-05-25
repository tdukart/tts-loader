# tts-loader

Very basic Webpack loader for text-to-speech.

This loader uses macOS's text-to-speech functionality to generate audio files with the contents of a passed-in text file.

## Requirements

Since this uses functionality built into macOS (f/k/a OS X), a Mac is required. This was developed and tested on Sierra 
10.12.5, but should work on any version of macOS or OS X.

In addition to the standard Webpack requirements, ffmpeg is required. It's easiest installed with
[Homebrew](https://brew.sh):

`brew install ffmpeg`

## Example usage

Assuming you have a file called 'quickbrownfox.txt' with the text you wish to have spoken:

```javascript
var quickBrownFox = require('tts-loader!quickbrownfox.txt');
```

That will return a array of file paths that can be used, for example, with [Howler](https://howlerjs.com):

```javascript
var foxHowl = new Howl({ src: quickBrownFox });
foxHowl.play();
```

Currently, the loader outputs the result in MP3 and OGG format.

## License

MIT license. See LICENSE.
