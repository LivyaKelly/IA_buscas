class Node {
    constructor(name) {
        this.name = name;
        this.neighbors = new Map(); // Pares de nó vizinho e distância
        this.parent = null;
    }

    addNeighbor(node, distance) {
        this.neighbors.set(node, distance);
    }
}

function depthLimitedSearch(start, goal, limit) {
    const visited = new Set(); 

    function recursiveDLS(current, goal, depth, visited) {
        if (current === goal) {
            return reconstructPath(goal);
        }
        if (depth === 0 || visited.has(current)) {
            return null;
        }

        visited.add(current);  // Marca o nó atual como visitado

        for (let [neighbor, distance] of current.neighbors) {
            if (!visited.has(neighbor)) {  // Verifica se o vizinho já foi visitado
                neighbor.parent = current;  // Define o parent para reconstrução do caminho
                let result = recursiveDLS(neighbor, goal, depth - 1, visited);
                if (result) {
                    return result;
                }
                neighbor.parent = null;  
            }
        }

        visited.delete(current); // Remove o nó atual da lista de visitados
        return null;
    }

    return recursiveDLS(start, goal, limit, visited);
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
let limiteProfundidade = 4; // Definir conforme necessário

let cidadeInicial = nós[nomeCidadeInicial];
let cidadeFinal = nós[nomeCidadeFinal];

console.log(depthLimitedSearch(cidadeInicial, cidadeFinal, limiteProfundidade));
