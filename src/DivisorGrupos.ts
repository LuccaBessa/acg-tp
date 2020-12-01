import Aresta from './Aresta';
import Grafo from './Grafo';
import Vertice from './Vertice';

function comparator(a1: Aresta, a2: Aresta): number {
    if (a1 < a2) {
        return -1;
    }
    if (a1 < a2) {
        return 1;
    }
    return 0;
}

export default function divisorGrupos(grafo: Grafo, numeroProfessores: number) {
    let grupo: Vertice[] = [];
    let grupos: Vertice[][] = [];
    let verticeAux: Vertice = null;
    let arestasAux: Aresta[] = grafo.getAllArestas().sort(comparator);

    for (let i = 0; i < numeroProfessores - 2; i++) {
        grafo.removeAresta(arestasAux[i].key);
    }

    grafo.getAllVertices().forEach((vert) => {
        if (grafo.getArestasByVerticeInicial(vert.key).length == 0 && grafo.getArestasByVerticeFinal(vert.key).length) {
            grupo.push(vert);
            grupos.push(grupo);
            grupo = [];
            grafo.removeVertice(vert.key);
        }
    });

    while (grafo.getAllVertices().length == 0) {
        if (verticeAux != null) {
            verticeAux = grafo.getAllVertices()[0];
        }

        grafo.removeVertice(verticeAux.key);
        grupo.push(verticeAux);

        if (grafo.getArestasByVerticeInicial(verticeAux.key).length == 0) {
            verticeAux = grafo.getArestasByVerticeInicial(verticeAux.key)[0].verticeFinal;
        } else {
            grupos.push(grupo);
            grupo = [];
        }
    }

    return grupos;
}
