class Stack {
    constructor() {
        this.elements = [];
    }

    push(element) {
        this.elements.push(element);
    }

    pop() {
        return this.elements.pop();
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}

class Node {
    constructor(name) {
        this.name = name;
        this.neighbors = new Map(); // Pares de nó vizinho e distância real
        this.parent = null;
    }

    addNeighbor(node, distance) {
        this.neighbors.set(node, distance);
    }
}

function reconstructPath(endNode) {
    let path = [];
    let current = endNode;
    while (current) {
        path.push(current.name);
        current = current.parent;
    }
    return path.reverse();
}

function depthFirstSearch(start, goal) {
    let stack = new Stack();
    let explored = new Set();
    stack.push(start);

    while (!stack.isEmpty()) {
        let current = stack.pop();

        if (current === goal) {
            return reconstructPath(goal);
        }

        if (!explored.has(current)) {
            explored.add(current);
            for (let [neighbor, distance] of current.neighbors) {
                if (!explored.has(neighbor)) {
                    neighbor.parent = current;
                    stack.push(neighbor);
                }
            }
        }
    }

    return "No path found";
}

let cidades = {
    "Arad": { vizinhos: {"Zerind": 75, "Timisoara": 118, "Sibiu": 140} },
    "Zerind": { vizinhos: {"Arad": 75, "Oradea": 71} },
    "Timisoara": { vizinhos: {"Arad": 118, "Lugoj": 111} },
    "Sibiu": { vizinhos: {"Arad": 140, "Oradea": 151, "Fagaras": 99, "Rimnicu Vilcea": 80} },
    "Oradea": { vizinhos: {"Zerind": 71, "Sibiu": 151} },
    "Craiova": { vizinhos: {"Drobeta": 120, "Rimnicu Vilcea": 146, "Pitesti": 138} },
    "Drobeta": { vizinhos: {"Mehadia": 75, "Craiova": 120} },
    "Eforie": { vizinhos: {"Hirsova": 86} },
    "Fagaras": { vizinhos: {"Sibiu": 99, "Bucharest": 211} },
    "Giurgiu": { vizinhos: {"Bucharest": 90} },
    "Hirsova": { vizinhos: {"Eforie": 86, "Urziceni": 98} },
    "Iasi": { vizinhos: {"Neamt": 87, "Vaslui": 92} },
    "Lugoj": { vizinhos: {"Timisoara": 111, "Mehadia": 70} },
    "Mehadia": { vizinhos: {"Lugoj": 70, "Drobeta": 75} },
    "Neamt": { vizinhos: {"Iasi": 87} },
    "Pitesti": { vizinhos: {"Rimnicu Vilcea": 97, "Craiova": 138, "Bucharest": 101} },
    "Rimnicu Vilcea": { vizinhos: {"Sibiu": 80, "Pitesti": 97, "Craiova": 146} },
    "Urziceni": { vizinhos: {"Bucharest": 85, "Hirsova": 98} },
    "Vaslui": { vizinhos: {"Iasi": 92, "Urziceni": 142} },
    "Bucharest": { vizinhos: {"Urziceni": 85, "Giurgiu": 90, "Pitesti": 101, "Fagaras": 211} },
};

let nós = {};
for (let nomeCidade in cidades) {
    nós[nomeCidade] = new Node(nomeCidade);
}

for (let [nomeCidade, dadosCidade] of Object.entries(cidades)) {
    for (let nomeVizinho in dadosCidade.vizinhos) {
        nós[nomeCidade].addNeighbor(nós[nomeVizinho], dadosCidade.vizinhos[nomeVizinho]);
    }
}

let nomeCidadeInicial = "Arad";
let nomeCidadeFinal = "Bucharest";
let cidadeInicial = nós[nomeCidadeInicial];
let cidadeFinal = nós[nomeCidadeFinal];

console.log(depthFirstSearch(cidadeInicial, cidadeFinal));

