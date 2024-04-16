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
    "Arad": { "vizinhos": {"Zerind": 75, "Timisoara": 118, "Sibiu": 140} },
    "Zerind": { "vizinhos": {"Oradea": 71, "Arad": 75} },
    "Timisoara": { "vizinhos": {"Arad": 118, "Lugoj": 111} },
    "Sibiu": { "vizinhos": {"Arad": 140, "Fagaras": 99, "Rimnicu Vilcea": 80, "Oradea": 151} },
    "Lugoj": { "vizinhos": {"Timisoara": 111, "Mehadia": 70} },
    "Mehadia": { "vizinhos": {"Lugoj": 70, "Drobeta": 75} },
    "Drobeta": { "vizinhos": {"Mehadia": 75, "Craiova": 120} },
    "Craiova": { "vizinhos": {"Drobeta": 120, "Rimnicu Vilcea": 146, "Pitesti": 138} },
    "Rimnicu Vilcea": { "vizinhos": {"Sibiu": 80, "Pitesti": 97, "Craiova": 146} },
    "Pitesti": { "vizinhos": {"Rimnicu Vilcea": 97, "Craiova": 138, "Bucharest": 101} },
    "Fagaras": { "vizinhos": {"Sibiu": 99, "Bucharest": 211} },
    "Bucharest": { "vizinhos": {"Fagaras": 211, "Pitesti": 101, "Giurgiu": 90, "Urziceni": 85} },
    "Giurgiu": { "vizinhos": {"Bucharest": 90} },
    "Oradea": { "vizinhos": {"Zerind": 71, "Sibiu": 151} },
    "Urziceni": { "vizinhos": {"Bucharest": 85, "Hirsova": 98, "Vaslui": 142} },
    "Hirsova": { "vizinhos": {"Urziceni": 98, "Eforie": 86} },
    "Eforie": { "vizinhos": {"Hirsova": 86} },
    "Vaslui": { "vizinhos": {"Urziceni": 142, "Iasi": 92} },
    "Iasi": { "vizinhos": {"Vaslui": 92, "Neamt": 87} },
    "Neamt": { "vizinhos": {"Iasi": 87} },
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

