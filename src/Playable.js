export default class Playable {
    /**
     *
     * @param {Mugin} Mugin The Mugin controller this playable object is cached in
     * @memberof Playable
     */
    constructor(Mugin, key) {
        this.Mugin = Mugin;
        this.key = key;
    }
}