import Grafo from './Grafo';
import { MinPriorityQueue } from '@datastructures-js/priority-queue';
import Aresta from './Aresta';

export function prim(grafo: Grafo) {
    let priorityQueue = new MinPriorityQueue();
    let auxPriorityQueue = new MinPriorityQueue();
    const arvGeradoraMin = new Grafo();
    let i = 0;

    function updateHeap(pq: any, vertice: any) {
        const listAux = new MinPriorityQueue();
        while (!pq.isEmpty()) {
            const removed: any = pq.dequeue();
            if (removed.element.key == vertice.key) {
                listAux.enqueue(vertice, vertice.dist);
            } else {
                listAux.enqueue(removed.element, removed.element.dist);
            }
        }

        return listAux;
    }

    grafo.getAllVertices().forEach((vertice) => {
        if (i == 0) {
            vertice.dist = 0;
        }
        arvGeradoraMin.addVertice(vertice);
        priorityQueue.enqueue(vertice, vertice.dist);
        auxPriorityQueue.enqueue(vertice, vertice.dist);
        i++;
    });

    while (!priorityQueue.isEmpty()) {
        const vertice: any = priorityQueue.dequeue();
        grafo.getArestasByVertice(vertice.element.key).forEach((aresta) => {
            let nextVert = aresta.verticeFinal.key != vertice.element.key ? aresta.verticeFinal : aresta.verticeInicial;
            let newCost = aresta.peso;
            let constains = false;

            priorityQueue.toArray().forEach((e: any) => {
                if (e.element == nextVert) constains = true;
            });

            if (constains && newCost < nextVert.dist) {
                nextVert.pred = vertice.element.key;
                nextVert.dist = newCost;
                priorityQueue = updateHeap(priorityQueue, nextVert);
                auxPriorityQueue = updateHeap(auxPriorityQueue, nextVert);
            }
        });
    }

    i = 0;
    auxPriorityQueue.toArray().forEach((e: any) => {
        if (e.element.pred != null) {
            arvGeradoraMin.addAresta(new Aresta(i, grafo.getVerticeByKey(e.element.pred), grafo.getVerticeByKey(e.element.key), e.priority));
            i++;
        }
    });

    return arvGeradoraMin;
}
