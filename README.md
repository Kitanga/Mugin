# Mugin

### Description

An audio library that brings interactive/dynamic music to modern HTML5 games.

### Documentation (More like what the API needs to be like)

User needs to load audio files

```javascript
var mugin = new Mugin();

// Load audio files
mugin.add.audio('key', {
    src: ['key.webm', 'key.m4a', 'key.ogg', 'key.mp3']
});
```

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

Next one needs