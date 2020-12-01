import Vertice from './Vertice';
import Aresta from './Aresta';

export default class Grafo {
    vertices: Vertice[];
    arestas: Aresta[];

    constructor() {
        this.vertices = [];
        this.arestas = [];
    }

    addVertice(novoVertice: Vertice) {
        this.vertices[novoVertice.key] = novoVertice;

        return this;
    }

    getVerticeByKey(verticeKey: number) {
        return this.vertices[verticeKey];
    }

    getAllVertices() {
        return Object.values(this.vertices);
    }

    getAllArestas() {
        return Object.values(this.arestas);
    }

    getArestasByVerticeInicial(verticeKey: number) {
        return this.arestas.filter((a) => a.verticeInicial.key == verticeKey);
    }

    getArestaByVerticeInicialAndVerticeFinal(verticeInicialKey: number, verticeFinalKey: number) {
        return this.arestas.filter((a) => a.verticeInicial.key == verticeInicialKey && a.verticeFinal.key == verticeFinalKey)[0];
    }

    addAresta(aresta: Aresta) {
        let verticeInicial = this.getVerticeByKey(aresta.verticeInicial.key);
        let verticeFinal = this.getVerticeByKey(aresta.verticeFinal.key);

        if (!verticeInicial) {
            this.addVertice(aresta.verticeInicial);
            verticeInicial = this.getVerticeByKey(aresta.verticeInicial.key);
        }

        if (!verticeFinal) {
            this.addVertice(aresta.verticeFinal);
            verticeFinal = this.getVerticeByKey(aresta.verticeFinal.key);
        }

        if (this.arestas[aresta.key]) {
            return;
        } else {
            this.arestas[aresta.key] = aresta;
        }

        return this;
    }
}
