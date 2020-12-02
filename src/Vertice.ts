export default class Vertice {
    key: number;
    cp: number;
    pred: number;

    constructor(key: number, cp: number) {
        this.key = key;
        this.cp = cp;
        this.pred = null;
    }

}
