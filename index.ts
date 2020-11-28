import Aresta from './src/Aresta';
import Grafo from './src/Grafo';
import LerArquivo from './src/LerArquivo';
import Vertice from './src/Vertice';
import { prim } from './src/Prim';


let g = new Grafo();
let ler = new LerArquivo();
let arvGerMin = new Grafo();

let alunos = ler.lerAlunos('alunos');
let matriz = ler.lerDissimilaridade('dissimilaridade');

alunos.forEach((aluno) => {
    g.addVertice(new Vertice(aluno.key, aluno.CampoPesquisa));
});

let allVertices = g.getAllVertices();

let index = 0;
for (let i = 0; i < allVertices.length - 1; i++) {
    for (let j = i + 1; j < allVertices.length; j++) {
        if (matriz[allVertices[i].cp][allVertices[j].cp] != -1) {
            g.addAresta(new Aresta(index, allVertices[i], allVertices[j], matriz[allVertices[i].cp][allVertices[j].cp]));
        } else {
            g.addAresta(new Aresta(index, allVertices[i], allVertices[j], matriz[allVertices[j].cp][allVertices[i].cp]));
        }
        index++;
    }
}

arvGerMin = prim(g, g.getAllVertices()[0]);

console.log('arvGerMin: vertices', arvGerMin.getAllVertices());
console.log('arvGerMin: arestas', arvGerMin.getAllArestas());
