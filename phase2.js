var utils = require('./utils')
var phase0 = require('./phase0')
var phase1 = require('./phase1')

exports.initialPopulation = function initialPopulation(rng, propArgs, count){
    let currentAmmount = 0;
    let population = [];
    while (currentAmmount < count) {
		population.push({prop: phase0.randomProp(rng, propArgs.vars, propArgs.maxHeight, propArgs.minHeight), fitness: NaN})
        currentAmmount ++;
	}
    return population;
}

exports.assessPopulation = function assessPopulation(population, truthTable){
    return population.map(individuo => {
        return {prop: individuo.prop, fitness: phase1.fitness(individuo.prop, truthTable)}
    })
}

exports.selection = function selection(rng, population){
    let totalFitness = 0;
    let currentAmmount = 0;
    let selectedPopulation = [];
    population.forEach(individuo => {
        totalFitness += individuo.fitness;
    });

    populationWithProb = population.map(individuo => {
        return {...individuo, prob: (individuo.fitness / totalFitness)}
    })

    while (currentAmmount < population.length) {
        let probability = rng();
		for(const individuo of populationWithProb){
            probability -= individuo.prob;
            if(probability <= 0){
                selectedPopulation.push({prop: individuo.prop, fitness: individuo.fitness});
                break;
            }
        }
        currentAmmount ++;
	}
    return selectedPopulation;
}

exports.mutation = function mutation(rng, prop, propArgs){
    let nodeCount = countNodes(prop);
    let chosenNode = utils.turnToIntBetween(rng(), nodeCount, 0);
    let mutatedProp = replaceNode(prop, chosenNode, propArgs, 1);
    return mutatedProp;
}

function countNodes(prop){
    if(prop.var){
        return 1;
    }
    key = Object.keys(prop);
    return (countNodes(prop[key][0]) + countNodes(prop[key][1]) + 1);
}

var contador = 0;
function replaceNode(prop, chosenNode, propArgs, currentHeight){
    const key = Object.keys(prop);
    let leftChild;
    let rightChild;
    if (chosenNode == contador){
        let newProp = phase0.randomProp(utils.rng, propArgs.vars, propArgs.maxHeight - currentHeight, 0);
        return newProp;
    }
    contador ++;
    if(prop.var) {
        return prop;
    } else {
        leftChild = !(prop[key][0]) ? currentHeight : replaceNode(prop[key][0],chosenNode,propArgs,currentHeight + 1);
        rightChild = !(prop[key][1]) ? currentHeight : replaceNode(prop[key][1],chosenNode,propArgs,currentHeight + 1);
    }
    const propKey = {};
    propKey[key] = [leftChild, rightChild];
    return propKey;
}

exports.evolutionStrategy = function evolutionStrategy(rng, truthTable, steps, count, propArgs){
    let step = 0;
    let population = exports.initialPopulation(rng, propArgs, count);
    population = exports.assessPopulation(population, truthTable);
    let best = Math.max(...population.map((individual) => {
        return individual.fitness
    }));
    //while (best < 1 && step < steps) {
    //step += 1;
    selectedProp = exports.selection(rng, population);
    console.log(population);
    population = population.forEach((individual) => {
        console.log(individual);
        console.log('hola');
        if (individual.prop == selectedProp) {
            return {prop: exports.mutation(rng, selectedProp, propArgs), fitness: NaN}
        }
    });
    console.log(population);
    //}
}
