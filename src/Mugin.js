/// <reference types="howler" />
'use strict';

/*!
 *  Mugin.js v0.1.0
 *
 *  (c) Kitanga Nday
 *
 *  MIT License
 */

// import {
//     Howl,
//     Howler
// } from './howler';
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

        /**
         * Here we set the url prop that allows us to set the default asset folders for the whole audio project and optionally individual file types.
         * 
         * The links are relative.
         * 
         * Make sure links have no spaces, but seperated by hyphens.
         */
        this.url = {
            base: ""
        };

        /**
         * Initializes Mugin. Here we setup the load URLs and such.
         */
        this.init = () => {
            // Start by setting full absolute links
            let url = this.url;

            // Add a forward slash at the end of the base prop if there isn't one
            (url.base.length && url.base[url.base.length - 1] !== '/') ? (url.base += '/') : '';

            // Now combine the base url
            for (let ix in url) {
                if (ix !== 'base') {
                    url[ix] = url.base + url[ix];
                    url[ix][url[ix].length - 1] !== '/' ? (url[ix] += '/') : '';
                    url[ix] = url[ix].replace(/\/\//g, '/');
                }
            }
        };
        
        this.cache = {};
        this.add = {
            _prefetchAudioCache: {},
            _prefetchMusicCache: {},
            _audioFileCount: 0,
            addedMusic: false,
            /**
             * Here we make sure that the key doesn't already exist in the preload caches
             * @param {string} key 
             */
            _validateKey: function (key) {
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
                if (--this.add._audioFileCount < 1) {
                    if (this.onload) {
                        this.onload();
                    } else {
                        console.warn("Woh there, please set the onload event.");
                    }
                }
            },
            _loadAudio: () => {
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
                    this._audioFileCount++;
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

        /**
         * Validates that Mugin has been setup correctly by developer
         * @returns bool
         */
        this.validate = () => {
            // First make sure that we have at least one audio file
            if (!this.add._audioFileCount) {
                // If we haven't defined a audio file
                throw new Error("You haven't added a single audio file using Mugin.add.audio() function");
            }
            // Now make sure that we have at least one audio group (aka music)
            if (!this.add.addedMusic) {
                // If we haven't defined a single group
                throw new Error("You haven't defined a single music group using Mugin.add.music() function");
            }

            return true;
        };
        // TODO: Make sure loading works
        this.load = (onload) => {
            // Validate
            if (this.validate()) {
                // First initialize some of Mugin's params
                this.init();
                // Now we set the onload event if it exists, 
                onload ? (this.onload = onload) : console.info("Huh? The onload event is not set. I'm pretty sure this will be set before setup is done.");
                this.add._loadAudio();
                this.add._loadMusic();
            }
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