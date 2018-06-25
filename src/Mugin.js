/// <reference types="howler" />
/*!
 *  Mugin.js v0.1.0
 *
 *  (c) Kitanga Nday
 *
 *  MIT License
 */

import {
    Howl,
    Howler
} from './howler';
import AudioFile from './AudioFile';

/**
 * The interactive music controller.
 *
 * @class Mugin
 */
class Mugin {
    constructor() {
        this.Howl = Howl;
        this.Howler = Howler;
        this.cache = {};
        this.add = {
            _prefetchAudioCache: {},
            _prefetchMusicCache: {},
            _audioFileTotalCount = 0,
            _audioFileCount = 0,
            _validateKey: function (key) {
                // Here we make sure that the key doesn't already exist in the preload caches
                for (let i in this._prefetchAudioCache) {
                    if (i === key) {
                        throw new Error('Do not use the same key twice for anything!!');
                    }
                }
                for (let i in this._prefetchMusicCache) {
                    if (i === key) {
                        throw new Error('Do not use the same key twice for anything!!');
                    }
                }
            },
            _fileLoaded: () => {
                if (--this.add._audioFileTotalCount < 1) {
                    if (this.onload) {
                        this.onload();
                    } else {
                        console.warn("I should probably set Mugin's onload listener. But hey, this is your game/project not mine.");
                    }
                }
            },
            _loadAudio: () => {
                // 
                let audios = this.add._prefetchAudioCache;
                for (let ix in audios) {
                    this.cache[ix] = new AudioFile(this, ix, new Howl(audios[ix]));
                    // new Howl(config);
                }
            },
            _loadMusic: (key, audios, stems) => {},
            /**
             * Adds an audio file to the cache
             * 
             * @param {string} key Unique key of the audio file
             * @param {{src: string[]}} config Howler.js compliant config object
             */
            audio: function (key, config) {
                // Make sure key is used only once
                this._validateKey(key);

                // Make sure the key exists and that the config's src prop is set to an array with length !== 0
                if (typeof key === 'string' && Array.isArray(config.src) && config.src.length > 0) {
                    config.onload = this._fileLoaded;
                    this._prefetchAudioCache[key] = config;
                    this._audioFileTotalCount++;
                }

                // A bunch of warnings to the dev for config props that are going to be overwritten
                if (config.onload) {
                    console.warn("Do not change the onload property, because Mugin uses its own loading mechanism. Mugin has an onload property that takes a function as a parameter, btw");
                }

                // Warn the dev that the config's onload prop should not be set.
                /* if (config.pool) {
                    console.warn("Do not change the onload property, because Mugin uses its own loading mechanism. Mugin has an onload property that takes a function as a parameter, btw");
                } */
            },
            /**
             * Used to add music, the keys for the audio files that belong to this music, and the stem names for them.
             * @param {string} key Unique key of the music
             * @param {string[]} audios An array of strings that point to audio file keys in cache
             * @param {string[]} stems An array of strings that set the above mentioned audio files to this music's stems
             */
            music: function (key, audios, stems) {
                // Make sure key is used only once
                this._validateKey(key);
                if (typeof key === 'string' && Array.isArray(audios) && Array.isArray(stems)) {
                    this._prefetchMusicCache[key] = {
                        audios,
                        stems
                    };
                }
            }
        };

        this.load = () => {
            this.add._loadAudio();
            this.add._loadMusic();
        };

        /**
         * Plays the music and any stems specified, otherwise, all the stems are played
         */
        this.play = (musicKey, audioKey) => {
            // If the music key exists in cache
            if (this.cache[musicKey] && typeof this.cache[musicKey] === "string") {
                // Check if the audioKey param is a string or array
                if (typeof audioKey === "string") {
                    // Play the audio file
                    this.cache[audioKey].play();
                } else if (Array.isArray(audioKey)) {
                    // If it's an array start playing all the children
                    for (let ix = 0, length = audioKey.length; ix < length; ix++) {
                        this.cache[audioKey[i]].play();
                    }
                } else {
                    console.error("Invalid audioKey parameter type. Either that or you didn't put anything");
                }
            } else {
                console.error("Invalid musicKey parameter type. Either that or you didn't put anything");
            }
        };

        /**
         * Returns a music object
         * @returns Music
         */
        this.music = (key) => {
            return this.cache[key];
        };
    }
}

let t = new Mugin();
t.add.now();