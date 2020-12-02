import Vertice from './Vertice';
import Aresta from './Aresta';

export default class Grafo {
    private vertices: Vertice[];
    private arestas: Aresta[];

    constructor() {
        this.vertices = [];
        this.arestas = [];
    }

    updatePred(verticeKey: number, predecessor: number){
        this.vertices = this.vertices.map((vertice)=>{
            if(vertice.key == verticeKey) vertice.pred = predecessor;
            return vertice
        })
    }

    addVertice(novoVertice: Vertice) {
        this.vertices[novoVertice.key] = novoVertice;

        return this;
    }

    removeVertice(verticieKey: number) {
        this.vertices = this.vertices.filter((vertice: Vertice) => vertice.key != verticieKey);
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

    getArestasByVerticeFinal(verticeKey: number) {
        return this.arestas.filter((a) => a.verticeFinal.key == verticeKey);
    }

    getArestasByVertice(verticeKey: number){
        return this.arestas.filter((a) => (a.verticeFinal.key == verticeKey) || a.verticeInicial.key == verticeKey);
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

    removeAresta(arestaKey: number) {
        this.arestas = this.arestas.filter((aresta: Aresta) => aresta.key != arestaKey);
    }
}
