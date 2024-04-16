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
    function recursiveDLS(current, goal, depth) {
        if (current === goal) {
            return reconstructPath(goal);
        }
        if (depth === 0) {
            return null;
        }

        for (let [neighbor, distance] of current.neighbors) {
            if (!neighbor.parent) {
                neighbor.parent = current;
                let result = recursiveDLS(neighbor, goal, depth - 1);
                if (result) {
                    return result;
                }
                neighbor.parent = null; // Backtrack
            }
        }
        return null;
    }

    return recursiveDLS(start, goal, limit);
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
let limiteProfundidade = 3; // Definir conforme necessário

let cidadeInicial = nós[nomeCidadeInicial];
let cidadeFinal = nós[nomeCidadeFinal];

console.log(depthLimitedSearch(cidadeInicial, cidadeFinal, limiteProfundidade));