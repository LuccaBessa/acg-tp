import Vertice from './Vertice';

export default class Aresta {
    key: number;
    verticeInicial: Vertice;
    verticeFinal: Vertice;
    peso: number;

    constructor(key: number, verticeInicial: Vertice, verticeFinal: Vertice, peso: number) {
        this.key = key;
        this.verticeInicial = verticeInicial;
        this.verticeFinal = verticeFinal;
        this.peso = peso;
    }
}
