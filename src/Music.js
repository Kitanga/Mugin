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

        this.play = (stems, audioProcess) => {
            // 
            for (let index = 0, length = stems.length; i < length; i++) {
                // 
                audioProcess(this.stems[stems[i]].audio);
            }
        };

        this.createMood = (key, stems, audioProcess) => {
            if (Array.isArray(stems)) {
                if (typeof key === 'string') {
                    this.moods[key] = {
                        play: function() {
                            // for (let index = 0, length = stems.length; i < length; i++) {
                                Mugin.music(key).play(stems, audioProcess);
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