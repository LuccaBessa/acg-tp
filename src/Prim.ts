import Grafo from './Grafo';
import Vertice from './Vertice';
import PriorityQueue from './PriorityQueue';
import Aresta from './Aresta';

export function prim(grafo: Grafo, comeco: Vertice) {
    const distancia: number[] = [];
    const parent: number[] = [];
    const priorityQueue = new PriorityQueue();
    const arvGeradoraMin = new Grafo();

    grafo.getAllVertices().forEach((vertice) => {
        arvGeradoraMin.addVertice(vertice);
        distancia[vertice.key] = vertice === comeco ? 0 : Infinity;
        parent[vertice.key] = -1;
        priorityQueue.push(vertice.key, distancia[vertice.key]);
    });

    while (!priorityQueue.isEmpty()) {
        const verticeKey = priorityQueue.pop();
        if (verticeKey != undefined) {
            grafo.getArestasByVerticeInicial(verticeKey).forEach((vizinho) => {
                if (grafo.getArestaByVerticeInicialAndVerticeFinal(verticeKey, vizinho.key) && distancia[verticeKey] + grafo.getArestaByVerticeInicialAndVerticeFinal(verticeKey, vizinho.key).peso < distancia[vizinho.key]) {
                    distancia[vizinho.key] = distancia[verticeKey] + grafo.getArestaByVerticeInicialAndVerticeFinal(verticeKey, vizinho.key).peso;
                    parent[vizinho.key] = verticeKey;
                    priorityQueue.update(vizinho.key, distancia[vizinho.key]);
                }
            });
        }
    }

    let index: number = 0;
    parent.forEach((vertice: number) => {
        if (vertice && parent[vertice]) {
            arvGeradoraMin.addAresta(new Aresta(index, grafo.getVerticeByKey(vertice), grafo.getVerticeByKey(parent[vertice]), 0));
            index++;
        }
    });

    return arvGeradoraMin;
}
