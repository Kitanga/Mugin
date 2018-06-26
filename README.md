# Mugin

## Description

An audio library that brings interactive/dynamic music to modern HTML5 games.

ALL DEVELOPMENT ON DEV BRANCH

## Documentation (More like what the API needs to be like)

### Preloading audio file

Loading the audio file

```javascript
var mugin = new Mugin();

// Load audio files
mugin.add.audio('key', {
    src: ['key.webm', 'key.m4a', 'key.ogg', 'key.mp3']
});
```

The first parameter is the unique key for the audio file (nothing else that requires a key can have this same key) and the second a [Howler.js](https://github.com/goldfire/howler.js) compliant [config object](https://github.com/goldfire/howler.js#options).

Alternatively you can set the baseURL for all files to be downloaded from. You can also set the baseURL for all the different formats.

```javascript
var mugin = new Mugin();

// Setting the base url
mugin.url.base = "/audio";

// The following will be added to the base url
mugin.url.webm = '/webm';
mugin.url.m4a = '/m4a';
mugin.url.ogg = '/ogg';
mugin.url.mp3 = '/mp3';

// Now when loading, instead of placing the entire relative url like so...

mugin.add.audio('key', {
    src: ['audio/webm/key.webm','audio/m4a/key.m4a','audio/ogg/key.ogg','audio/mp3/key.mp3']
});

// ...you only place the name of the file (extension included)

mugin.add.audio('key', {
    src: ['key.webm','key.m4a','key.ogg','key.mp3']
});
```

Now to use Mugin.js, you have to declare an audio group. These audio groups are called music. So as to not cause confusion, `Mugin.add.audio()` adds audio files (sound files that can be played by the browser) and `Mugin.add.music()` groups these audio files. These audio files (or stems to be more exact) together are called music. Got it? Good, moving on...

Adding music is very simple

```javascript

// First you load the audio files
var mugin = new Mugin();

mugin.add.audio('key', {
    src: ['key.webm', 'key.m4a', 'key.ogg', 'key.mp3']
});

mugin.add.audio('key2', {
    src: ['key2.webm', 'key2.m4a', 'key2.ogg', 'key2.mp3']
});

// Then we add the group
mugin.add.music('song', [
    'key',
    'key2',
],[
    'vocals',
    'percussion'
]);
```

The first parameter is the unique key for the 