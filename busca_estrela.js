class Node {
    constructor(name, heuristic) {
        this.name = name;
        this.heuristic = heuristic; // Distância estimada até o destino
        this.neighbors = new Map(); // Pares de nó vizinho e distância real
        this.parent = null;
        this.g = Infinity; // Custo para alcançar este nó
        this.f = Infinity; // g + heurística
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
        this.elements.push(node);
        this.elements.sort((a, b) => a.f - b.f);
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

function aStar(start, goal) {
    let openSet = new PriorityQueue();
    start.g = 0;
    start.f = start.heuristic;
    openSet.enqueue(start);

    while (!openSet.isEmpty()) {
        let current = openSet.dequeue();
        
        if (current === goal) {
            return reconstructPath(goal);
        }

        for (let [neighbor, distance] of current.neighbors) {
            let tentativeGScore = current.g + distance;

            if (tentativeGScore < neighbor.g) {
                neighbor.parent = current;
                neighbor.g = tentativeGScore;
                neighbor.f = neighbor.g + neighbor.heuristic;
                if (!openSet.elements.includes(neighbor)) {
                    openSet.enqueue(neighbor);
                }
            }
        }
    }

    return "No path found";
}

// Exemplo de uso:
// Valores heurísticos reais e as distâncias entre vizinhos
let arad = new Node("Arad", 366);
let zerind = new Node("Zerind", 374);
let timisoara = new Node("Timisoara", 329);
let sibiu = new Node("Sibiu", 253);
let oradea = new Node("Oradea", 380);
let craiova = new Node("Craiova", 160);
let rimnicuVilcea = new Node("Rimnicu Vilcea", 193);
let urziceni = new Node("Urziceni", 80);
let drobeta = new Node("Drobeta", 242);
let eforie = new Node("Eforie", 161);
let hirsova = new Node("Hirsova", 151);
let iasi = new Node("Iasi", 226);
let lugoj = new Node("Lugoj", 244);
let mehadia = new Node("Mehadia", 241);
let vaslui = new Node("Vaslui", 199);
let neamt = new Node("Neamt", 234);
let bucharest = new Node("Bucharest", 0);
let fagaras = new Node("Fagaras", 176);
let giurgiu = new Node("Giurgiu", 77);
let pitesti = new Node("Pitesti", 100);

// Distâncias e heurísticas 
const cidades = {
    "Arad": { "heurística": 366, "vizinhos": {"Zerind": 75, "Timisoara": 118, "Sibiu": 140} },
    "Zerind": { "heurística": 374, "vizinhos": {"Arad": 75, "Oradea": 71} },
    "Timisoara": { "heurística": 329, "vizinhos": {"Arad": 118, "Lugoj": 111} },
    "Sibiu": { "heurística": 253, "vizinhos": {"Arad": 140, "Oradea": 151, "Fagaras": 99, "Rimnicu Vilcea": 80} },
    "Oradea": { "heurística": 380, "vizinhos": {"Zerind": 71, "Sibiu": 151} },
    "Lugoj": { "heurística": 244, "vizinhos": {"Timisoara": 111, "Mehadia": 70} },
    "Mehadia": { "heurística": 241, "vizinhos": {"Lugoj": 70, "Drobeta": 75} },
    "Drobeta": { "heurística": 242, "vizinhos": {"Mehadia": 75, "Craiova": 120} },
    "Craiova": { "heurística": 160, "vizinhos": {"Drobeta": 120, "Rimnicu Vilcea": 146, "Pitesti": 138} },
    "Rimnicu Vilcea": { "heurística": 193, "vizinhos": {"Sibiu": 80, "Pitesti": 97, "Craiova": 146} },
    "Pitesti": { "heurística": 100, "vizinhos": {"Rimnicu Vilcea": 97, "Craiova": 138, "Bucharest": 101} },
    "Fagaras": { "heurística": 176, "vizinhos": {"Sibiu": 99, "Bucharest": 211} },
    "Bucharest": { "heurística": 0, "vizinhos": {"Fagaras": 211, "Pitesti": 101, "Giurgiu": 90, "Urziceni": 85} },
    "Giurgiu": { "heurística": 77, "vizinhos": {"Bucharest": 90} },
    "Urziceni": { "heurística": 80, "vizinhos": {"Bucharest": 85, "Hirsova": 98, "Vaslui": 142} },
    "Hirsova": { "heurística": 151, "vizinhos": {"Eforie": 86, "Urziceni": 98} },
    "Eforie": { "heurística": 161, "vizinhos": {"Hirsova": 86} },
    "Vaslui": { "heurística": 199, "vizinhos": {"Iasi": 92, "Urziceni": 142} },
    "Iasi": { "heurística": 226, "vizinhos": {"Neamt": 87, "Vaslui": 92} },
    "Neamt": { "heurística": 234, "vizinhos": {"Iasi": 87} },
};

// Construir os nós e configurar seus vizinhos
let nós = {};
for (let nomeCidade in cidades) {
    nós[nomeCidade] = new Node(nomeCidade, cidades[nomeCidade].heurística);
}

for (let [nomeCidade, dadosCidade] of Object.entries(cidades)) {
    for (let nomeVizinho in dadosCidade.vizinhos) {
        nós[nomeCidade].addNeighbor(nós[nomeVizinho], dadosCidade.vizinhos[nomeVizinho]);
    }
}

// Exemplo de uso, substitua 'Arad' e 'Bucharest' pelos nomes das cidades coletados do usuário
let nomeCidadeInicial = "Arad"; // Substituir pelo input do usuário
let nomeCidadeFinal = "Bucharest"; // Substituir pelo input do usuário
let cidadeInicial = nós[nomeCidadeInicial];
let cidadeFinal = nós[nomeCidadeFinal];

console.log(aStar(cidadeInicial, cidadeFinal));
