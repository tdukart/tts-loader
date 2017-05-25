# tts-loader

Very basic Webpack loader for text-to-speech.

This loader uses text-to-speech functionality to generate audio files with the contents of a passed-in text file.

## Requirements

This loader currently supports macOS's built-in text-to-speech functionality (on Macs only) and Google's unofficially
supported text-to-speech API.

In addition to the standard Webpack requirements, ffmpeg is required. On a Mac, it's easiest installed with
[Homebrew](https://brew.sh):

`brew install ffmpeg`

For other platforms, check out [ffmpeg's Downloads page](https://ffmpeg.org/download.html).

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

## Configuration

For greater configuration, it's recommended that you use a special naming convention for your text files and use the
Webpack config files.

`macVoice`: A string to define which macOS voice to use. To get a list of the macOS voices on your system, run
`say -v '?'` in Terminal. This defaults to the voice you have selected in your System Preferences.

`drivers`: An array of drivers to attempt. This defaults to `['mac', 'google']`.

### Sample configuration

```javascript
{
    test: /\.speech\.txt$/,
    loader: 'tts-loader',
    query: {
        drivers: ['google', 'mac'],
        macVoice: 'Fiona'
    }
}
```

## License

MIT license. See LICENSE.
