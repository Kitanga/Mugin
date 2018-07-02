import Playable from './Playable';
export default class Music extends Playable {
    /**
     *
     * @param {Mugin} Mugin The Mugin controller this playable object is cached in
     * @memberof Playable
     */
    constructor(Mugin, key, stems) {
        super(Mugin, key);
        this.stems = stems;
        this.moods = {};
        this.playAll = (audioProcess) => {
            // Otherwise, play all the stems
            let this_stems = this.stems;
            for (let ix = 0, length = this_stems.length; ix < length; ix++) {
                // 
                if (audioProcess) {
                    audioProcess(this_stems[ix].audio);
                }

                this_stems[ix].audio.play();
            }
        };
        /**
         * 
         * @param {string[]} [stems] The stems that need to be playing
         * @param {function(AudioFile)} [audioProcess] Anything that need to be done before the audio file is faded-in is done here.
         */
        this.play = (stems, audioProcess) => {
            // Play
            if (typeof stems === 'string') {
                // 
            } else if (Array.isArray(stems)) {
                for (let ix = 0, length = stems.length; ix < length; ix++) {
                    // 
                    if (audioProcess) {
                        audioProcess(this.stems[stems[i]]);
                    }

                    this.stems[stems[i]].audio.play();
                }
            } else {
                this.playAll();
            }
        };

        this.createMood = (key, stems, audioProcess) => {
            if (Array.isArray(stems)) {
                if (typeof key === 'string') {
                    this.moods[key] = {
                        play: () => {
                            // for (let index = 0, length = stems.length; i < length; i++) {
                            this.play(stems, audioProcess);
                            // }
                        },
                        stems,
                        audioProcess
                    }
                } else {
                    console.error("The key param should be a string");
                }
            } else {
                console.error("The stems param should be an array");
            }
        };
        this.setMood = (key) => {
            this.moods[key].play();
        };
    }
}