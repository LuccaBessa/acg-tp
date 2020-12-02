import Grafo from './Grafo';
import Vertice from './Vertice';
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
    const verticesAnteriores: number[] = [];
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
        verticesAnteriores[vertice.key] = -1;
        priorityQueue.enqueue(vertice.key, distancia[vertice.key]);
    });
    const verticeList = [];
    // Updating 'distancia' object
    while (!priorityQueue.isEmpty()) {
        const vertice : any = priorityQueue.dequeue();
        arvMinList.push(vertice)
        console.log(vertice)
        if (vertice != undefined) {
            grafo.getArestasByVertice(vertice.element).forEach((vizinho) => {
                const vizinhoAtual = vizinho.verticeFinal.key != vertice.element? vizinho.verticeFinal: vizinho.verticeInicial;
                let distanciaAtual: number;
                if () {
                    distancia[vizinhoAtual.key] = distancia[vertice.element] + grafo.getArestaByVerticeInicialAndVerticeFinal(vertice.element, vizinhoAtual.key).peso;
                    verticesAnteriores[vizinhoAtual.key] = vertice.element;
                    arvGeradoraMin.updatePred(vizinhoAtual.key, vertice.element)
                    updateHeap({key: vizinhoAtual.key, priority: distancia[vizinhoAtual.key]});
                }
            });
        }
    }

    newCost = currentVert.getWeight(nextVert)
          if nextVert in pq and newCost<nextVert.getDistance():
              nextVert.setPred(currentVert)
              nextVert.setDistance(newCost)
              pq.decreaseKey(nextVert,newCost)


    console.log(arvGeradoraMin)
    console.log(distancia)
    let index: number = 0;
    // verticesAnteriores.forEach((vertice: number) => {

    //     if (vertice && verticesAnteriores[vertice]) {
    //         arvGeradoraMin.addAresta(new Aresta(index, grafo.getVerticeByKey(vertice), grafo.getVerticeByKey(verticesAnteriores[vertice]), 0));
    //         index++;
    //     }
    // });

    // arvMinList.forEach (()=>{
    //     if (vertice && verticesAnteriores[vertice]) {
    //         arvGeradoraMin.addAresta(new Aresta(index, grafo.getVerticeByKey(vertice), grafo.getVerticeByKey(verticesAnteriores[vertice]), 0));
    //         index++;
    //     }
    // })

    return arvGeradoraMin;
}
