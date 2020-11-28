import Grafo from './Grafo';
import Vertice from './Vertice';
//import PriorityQueue from './PriorityQueue';
import Aresta from './Aresta';
import { MinPriorityQueue } from '@datastructures-js/priority-queue';

const comparator = function (a: any, b: any) {
    return a.priority < b.priority;
};
const comparator2 = function (a: any, b: any) {
    return a.priority < b.priority? 0 : 1 ;
};


export function prim(grafo: Grafo, comeco: Vertice) {
    const distancia: number[] = [];
    const parent: number[] = [];
    let priorityQueue = new MinPriorityQueue();
    const arvGeradoraMin = new Grafo();
    const arvMinList: any[] = [];
    function updateHeap(vertice: any) {
        const listAux = new MinPriorityQueue()
        while(!priorityQueue.isEmpty()){
            const removed: any = priorityQueue.dequeue();
            if(removed.element == vertice.key){
                listAux.enqueue(vertice.key, vertice.priority);
            } else{
                listAux.enqueue(removed.element, removed.priority);
            }
        }
        
        priorityQueue = listAux;
    }

    grafo.getAllVertices().forEach((vertice) => {
        arvGeradoraMin.addVertice(vertice);
        distancia[vertice.key] = vertice === comeco ? 0 : Infinity;
        parent[vertice.key] = -1;
        priorityQueue.enqueue(vertice.key, distancia[vertice.key]);
    });

    // Updating 'distancia' object
    while (!priorityQueue.isEmpty()) {
        const vertice : any = priorityQueue.dequeue();
        arvMinList.push(vertice)
        if (vertice != undefined) {
            grafo.getArestasByVerticeInicial(vertice.element).forEach((vizinho) => {
                const vizinhoAtual = vizinho.verticeFinal;
                const compareDistance = grafo.getArestaByVerticeInicialAndVerticeFinal(vertice.element, vizinhoAtual.key) && distancia[vertice.element] == Infinity? 1 : 0
                if (compareDistance + grafo.getArestaByVerticeInicialAndVerticeFinal(vertice.element, vizinhoAtual.key).peso < distancia[vizinhoAtual.key]) {
                    distancia[vizinhoAtual.key] = distancia[vertice.element] + grafo.getArestaByVerticeInicialAndVerticeFinal(vertice.element, vizinhoAtual.key).peso;
                    parent[vizinhoAtual.key] = vertice.element;

                    updateHeap({key: vizinhoAtual.key, priority: distancia[vizinhoAtual.key]});
                }
            });
        }
    }


    console.log(parent)
    console.log(distancia)
    let index: number = 0;
    // parent.forEach((vertice: number) => {

    //     if (vertice && parent[vertice]) {
    //         arvGeradoraMin.addAresta(new Aresta(index, grafo.getVerticeByKey(vertice), grafo.getVerticeByKey(parent[vertice]), 0));
    //         index++;
    //     }
    // });

    // arvMinList.forEach (()=>{
    //     if (vertice && parent[vertice]) {
    //         arvGeradoraMin.addAresta(new Aresta(index, grafo.getVerticeByKey(vertice), grafo.getVerticeByKey(parent[vertice]), 0));
    //         index++;
    //     }
    // })

    return arvGeradoraMin;
}
