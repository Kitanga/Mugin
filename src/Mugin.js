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
import Music from './Music';
import * as util from './util';

/**
 * The interactive music controller.
 *
 * @class Mugin
 */
class Mugin {
    constructor() {
        this.Howl = Howl;
        this.Howler = Howler;

        this.url = {
            base: "/",

        }

        this.cache = {};
        this.add = {
            _prefetchAudioCache: {},
            _prefetchMusicCache: {},
            _audioFileTotalCount = 0,
            _audioFileCount = 0,
            addedMusic: false,
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
                        console.warn("You should probably set Mugin's onload listener. But hey, this is your game/project not mine.");
                    }
                }
            },
            _loadAudio: () => {
                // First make sure that we have at least one audio group (aka music)
                if (!this.add.addedMusic) {
                    // If we haven't defined a single group
                    throw new Error("You haven't defined a single music group using Mugin.add.music() function");
                }
                let audios = this.add._prefetchAudioCache;
                for (let ix in audios) {
                    this.cache[ix] = new AudioFile(this, ix, new Howl(audios[ix]));
                    // new Howl(config);
                }
            },
            _loadMusic: () => {
                // 
                let music = this.add._prefetchMusicCache;
                for (let ix in music) {
                    // Here we set the stems equal to the audio file in the cache
                    let stems = {};
                    for (let ix2 = 0, length = music[ix].stems.length; ix2 < length; ix2++) {
                        // 
                        stems[music[ix].stems[ix2]] = this.cache[musix[ix].audios[ix2]];
                    }
                    this.cache[ix] = new Music(this, ix, stems);
                }
            },
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
                if (typeof key === 'string' && util.isArray(config.src) && config.src.length > 0) {
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
                this.addedMusic = true;
                if (typeof key === 'string' && util.isArray(audios) && util.isArray(stems) && audios.length === stems.length) {
                    this._prefetchMusicCache[key] = {
                        audios,
                        stems
                    };
                } else {
                    throw new Error("You loaded the music incorrectly check to make sure the key is a unique key (no other item being loaded--music or audio--has the same key, that the audio and stems params are both arrays with strings inside and the same length.");
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
        this.play = (key) => {
            // If the music key exists in cache
            // if (this.cache[key])
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