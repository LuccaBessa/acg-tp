import math
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

def prim(graph: list, root: Vertex) -> list:

    a = []
    for u in graph:
        u.key = math.inf
        u.pi = None

    root.key = 0
    q = graph[:]

    while q:
        u = min(q)
        q.remove(u)
        for v in u.neighbors:
            if (v in q) and (u.edges[v.id] < v.key):
                v.pi = u
                v.key = u.edges[v.id]

    for i in range(1, len(graph)):
        a.append((int(graph[i].id) + 1, int(graph[i].pi.id) + 1))

    return a

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

    
    prim(g, g[0])
    print(g)