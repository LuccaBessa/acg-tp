import { Aluno } from './types';

export default class LerArquivo {
    fs = require('fs');
    path = require('path');
    readline = require('readline');

    lerAlunos = (arq: string) => {
        let alunos: Aluno[] = [];
        let filePath = this.path.join(__dirname, `../assets/${arq}.txt`);
        let linhas = this.fs.readFileSync(filePath).toString().split('\n');

        linhas.forEach((linha: string) => {
            let campos = linha.split(' ');
            alunos.push({ key: Number(campos[0]), CampoPesquisa: Number(campos[1]) });
        });

        return alunos;
    };

    lerDissimilaridade = (arq: string) => {
        let matriz: number[][] = [];
        let filePath = this.path.join(__dirname, `../assets/${arq}.txt`);
        let linhas = this.fs.readFileSync(filePath).toString().split('\n');

        linhas.forEach((linha: string) => {
            let campos = linha.split(' ');
            let camposNum = campos.map((campo: string) => {
                if (campo === '') {
                    return -1;
                }

                return Number(campo);
            });

            matriz.push(camposNum);
        });

        return matriz;
    };
}
