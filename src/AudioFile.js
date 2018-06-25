import Playable from './Playable';
export default class Audio extends Playable {
    /**
     *
     * @param {Mugin} Mugin The Mugin controller this playable object is cached in
     * @memberof Playable
     */
    constructor(Mugin, key, howlerObject) {
        super(Mugin, key);
        this.audio = howlerObject;
        this.play = () => this.audio.play();
    }
}