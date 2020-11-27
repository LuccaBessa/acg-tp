class Vertex:
    def __init__(self, id):
        self.id = id
        self.pi = None
        self.neighbors = []
        self.edges = {}

    def addNeighbor(self, vertex):
        self.neighbors.append(vertex)

    def addEdge(self, id, weight):
        self.edges[id] = weight

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

def prim(graph, root):

    a = []
    for u in graph:
        u.key = float('inf')
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

    for i in graph:
        print(i)
        a.append((i.id + 1, i.pi.id + 1))

    return a

if __name__ == "__main__":

    students = ReadStudents('alunos.txt');
    matrix = ReadMatrix('dissimilaridade.txt');
    g = []

    for s in students:
        v = Vertex(s['key'])
        g.append(v)

    length = len(g)
    for i in range(length):
        for j in range(length):
            if(i != j):
                if (matrix[students[i]['researchId']][students[j]['researchId']] != -1):
                    g[i].addNeighbor(Vertex(j))
                    g[i].addEdge(j, matrix[students[i]['researchId']][students[j]['researchId']])
                else:
                    g[i].addNeighbor(Vertex(j))
                    g[i].addEdge(j, matrix[students[j]['researchId']][students[i]['researchId']])

    
    prim(g, g[0])