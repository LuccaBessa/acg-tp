export default class Vertice {
    key: number;
    cp: number;
    pred: number;
    dist: number;

    constructor(key: number, cp: number) {
        this.key = key;
        this.cp = cp;
        this.pred = null;
        this.dist = Infinity;
    }
}
