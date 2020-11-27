class Vertex:
    def __init__(self, id):
        self.id = str(id)
        self.neighbors = []
        self.edges = {}

    def addNeighbor(self, vertex):
        self.neighbors.append(vertex)

    def addEdge(self, vertex, weight):
        self.edges[vertex.id] = weight

def ReadStudents(file):
        f = open(file, 'r');
        lines = f.readlines();
        students = []

        for linha in lines:
            campos = linha.split(' ')
            students.append({ "key": int(campos[0]), "researchId": int(campos[1]) });

        f.close()
        
        return students;

def ReadMatrix(file):
    f = open(file, 'r');
    lines = f.readlines();
    matrix = []

    for line in lines:
        campos = line.split(' ');
        camposNum = []
        
        for campo in campos:
            if (campo == ''):
                camposNum.append(-1)
            else: 
                camposNum.append(int(campo));

        matrix.append(camposNum);

    f.close()

    return matrix;

if __name__ == "__main__":

    students = ReadStudents('alunos.txt');
    matrix = ReadMatrix('dissimilaridade.txt');
    g = []

    for s in students:
        v = Vertex(s['key'])
        g.append(v)

    print(g)

    length = len(g)
    for i in range(length-1):
        for j in range(i+1, length):
            if (matrix[students[i]['researchId']][students[j]['researchId']] != -1):
                # criar aresta com a com da matriz como peso
                print('a')
            else:
                # criar aresta com a pos da matriz invertida
                print('b')


    print(g)