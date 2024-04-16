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

class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    enqueue(element, priority) {
        this.elements.push({ element, priority });
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.elements.shift().element;
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

function uniformCostSearch(start, goal) {
    let queue = new PriorityQueue();
    let costs = new Map();
    costs.set(start, 0);
    queue.enqueue(start, 0);

    while (!queue.isEmpty()) {
        let current = queue.dequeue();

        if (current === goal) {
            return reconstructPath(goal);
        }

        for (let [neighbor, distance] of current.neighbors) {
            let newCost = costs.get(current) + distance;
            if (!costs.has(neighbor) || newCost < costs.get(neighbor)) {
                costs.set(neighbor, newCost);
                neighbor.parent = current;
                queue.enqueue(neighbor, newCost);
            }
        }
    }

    return "No path found";
}

// Defina nós e vizinhos usando os dados do mapa
let cidades = {
    "Arad": { "vizinhos": {"Zerind": 75, "Timisoara": 118, "Sibiu": 140} },
    "Zerind": { "vizinhos": {"Oradea": 71, "Arad": 75} },
    "Timisoara": { "vizinhos": {"Arad": 118, "Lugoj": 111} },
    "Sibiu": { "vizinhos": {"Arad": 140, "Oradea": 151, "Fagaras": 99, "Rimnicu Vilcea": 80} },
    "Oradea": { "vizinhos": {"Zerind": 71, "Sibiu": 151} },
    "Lugoj": { "vizinhos": {"Timisoara": 111, "Mehadia": 70} },
    "Mehadia": { "vizinhos": {"Lugoj": 70, "Drobeta": 75} },
    "Drobeta": { "vizinhos": {"Mehadia": 75, "Craiova": 120} },
    "Craiova": { "vizinhos": {"Drobeta": 120, "Rimnicu Vilcea": 146, "Pitesti": 138} },
    "Rimnicu Vilcea": { "vizinhos": {"Sibiu": 80, "Pitesti": 97, "Craiova": 146} },
    "Pitesti": { "vizinhos": {"Rimnicu Vilcea": 97, "Craiova": 138, "Bucharest": 101} },
    "Fagaras": { "vizinhos": {"Sibiu": 99, "Bucharest": 211} },
    "Bucharest": { "vizinhos": {"Fagaras": 211, "Pitesti": 101, "Giurgiu": 90, "Urziceni": 85} },
    "Giurgiu": { "vizinhos": {"Bucharest": 90} },
    "Urziceni": { "vizinhos": {"Bucharest": 85, "Hirsova": 98, "Vaslui": 142} },
    "Hirsova": { "vizinhos": {"Eforie": 86, "Urziceni": 98} },
    "Eforie": { "vizinhos": {"Hirsova": 86} },
    "Vaslui": { "vizinhos": {"Iasi": 92, "Urziceni": 142} },
    "Iasi": { "vizinhos": {"Neamt": 87, "Vaslui": 92} },
    "Neamt": { "vizinhos": {"Iasi": 87} },
};

// Construir os nós e configurar seus vizinhos
let nós = {};
for (let nomeCidade in cidades) {
    nós[nomeCidade] = new Node(nomeCidade);
}

for (let [nomeCidade, dadosCidade] of Object.entries(cidades)) {
    for (let nomeVizinho in dadosCidade.vizinhos) {
        nós[nomeCidade].addNeighbor(nós[nomeVizinho], dadosCidade.vizinhos[nomeVizinho]);
    }
}

// Usar busca de custo uniforme para encontrar caminho
let nomeCidadeInicial = "Arad"; // Substituir pelo input do usuário
let nomeCidadeFinal = "Bucharest"; // Substituir pelo input do usuário
let cidadeInicial = nós[nomeCidadeInicial];
let cidadeFinal = nós[nomeCidadeFinal];

console.log(uniformCostSearch(cidadeInicial, cidadeFinal));
