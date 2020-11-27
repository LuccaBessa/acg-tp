import Vertex
import math
from typing import Iterator

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
