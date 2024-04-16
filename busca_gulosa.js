class Node {
    constructor(name, heuristic) {
        this.name = name;
        this.heuristic = heuristic;
        this.neighbors = new Map();
        this.parent = null;
    }

    addNeighbor(node, distance) {
        this.neighbors.set(node, distance);
    }
}

class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    enqueue(node) {
        if (!this.elements.some(e => e.name === node.name)) {
            this.elements.push(node);
            this.elements.sort((a, b) => a.heuristic - b.heuristic);
        }
    }

    dequeue() {
        return this.elements.shift();
    }

    isEmpty() {
        return this.elements.length === 0;
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

function greedyBestFirstSearch(start, goal) {
    let openSet = new PriorityQueue();
    let explored = new Set();
    openSet.enqueue(start);

    while (!openSet.isEmpty()) {
        let current = openSet.dequeue();
        
        if (current === goal) {
            return reconstructPath(goal);
        }

        explored.add(current.name);

        for (let [neighbor, distance] of current.neighbors) {
            if (!explored.has(neighbor.name)) {
                neighbor.parent = current;
                if (!openSet.elements.some(e => e.name === neighbor.name)) {
                    openSet.enqueue(neighbor);
                }
            }
        }
    }

    return "No path found";
}

// Definindo nós e heurísticas para o mapa da Romênia
let nodes = {
    "Arad": new Node("Arad", 366),
    "Bucharest": new Node("Bucharest", 0),
    "Craiova": new Node("Craiova", 160),
    "Drobeta": new Node("Drobeta", 242),
    "Eforie": new Node("Eforie", 161),
    "Fagaras": new Node("Fagaras", 176),
    "Giurgiu": new Node("Giurgiu", 77),
    "Hirsova": new Node("Hirsova", 151),
    "Iasi": new Node("Iasi", 226),
    "Lugoj": new Node("Lugoj", 244),
    "Mehadia": new Node("Mehadia", 241),
    "Neamt": new Node("Neamt", 234),
    "Oradea": new Node("Oradea", 380),
    "Pitesti": new Node("Pitesti", 100),
    "Rimnicu Vilcea": new Node("Rimnicu Vilcea", 193),
    "Sibiu": new Node("Sibiu", 253),
    "Timisoara": new Node("Timisoara", 329),
    "Urziceni": new Node("Urziceni", 80),
    "Vaslui": new Node("Vaslui", 199),
    "Zerind": new Node("Zerind", 374)
};

// Configurando vizinhos
const connections = {
    "Arad": {"Zerind": 75, "Timisoara": 118, "Sibiu": 140},
    "Zerind": {"Arad": 75, "Oradea": 71},
    "Timisoara": {"Arad": 118, "Lugoj": 111},
    "Sibiu": {"Arad": 140, "Oradea": 151, "Fagaras": 99, "Rimnicu Vilcea": 80},
    "Oradea": {"Zerind": 71, "Sibiu": 151},
    "Craiova": {"Drobeta": 120, "Rimnicu Vilcea": 146, "Pitesti": 138},
    "Drobeta": {"Mehadia": 75, "Craiova": 120},
    "Eforie": {"Hirsova": 86},
    "Fagaras": {"Sibiu": 99, "Bucharest": 211},
    "Giurgiu": {"Bucharest": 90},
    "Hirsova": {"Eforie": 86, "Urziceni": 98},
    "Iasi": {"Neamt": 87, "Vaslui": 92},
    "Lugoj": {"Timisoara": 111, "Mehadia": 70},
    "Mehadia": {"Lugoj": 70, "Drobeta": 75},
    "Neamt": {"Iasi": 87},
    "Pitesti": {"Rimnicu Vilcea": 97, "Craiova": 138, "Bucharest": 101},
    "Rimnicu Vilcea": {"Sibiu": 80, "Pitesti": 97, "Craiova": 146},
    "Urziceni": {"Bucharest": 85, "Hirsova": 98},
    "Vaslui": {"Iasi": 92, "Urziceni": 142},
    "Bucharest": {"Urziceni": 85, "Giurgiu": 90, "Pitesti": 101, "Fagaras": 211}
};

// Conectando os nós
for (let city in connections) {
    for (let neighbor in connections[city]) {
        nodes[city].addNeighbor(nodes[neighbor], connections[city][neighbor]);
    }
}

// Exemplo de uso: de Arad para Bucharest
console.log(greedyBestFirstSearch(nodes["Arad"], nodes["Bucharest"]));
