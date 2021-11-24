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

var contador = 0;
exports.mutation = function mutation(rng, prop, propArgs){
    let nodeCount = countNodes(prop);
    let chosenNode = utils.turnToIntBetween(rng(), nodeCount, 0);
    let mutatedProp = replaceNode(prop, chosenNode, propArgs, 1);
    contador = 0;
    return mutatedProp;
}

function countNodes(prop){
    key = Object.keys(prop);
    if (key == "var") {
        return 1;
    } else if (key == "neg") {
        return countNodes(prop[key]) + 1;
    } else if (key == "and" || key == "or" || key == "iff" || key == "cond") {
        let prop0 = prop[key][0];
        let prop1 = prop[key][1];
        return (countNodes(prop0) + countNodes(prop1) + 1);
    } else {
        return 0;
    }
}

function replaceNode(prop, chosenNode, propArgs, currentHeight){
    const key = Object.keys(prop);
    const propKey = {};
    let leftChild, rightChild, onlyChild, prop0, prop1;
    if (chosenNode == contador){
        let newProp = phase0.randomProp(utils.rng, propArgs.vars, propArgs.maxHeight - currentHeight, 0);
        return newProp;
    }
    contador ++;
    if(prop.var) {
        return prop;
    } else if (key == "neg") {
        if (prop.prop) {
            prop0 = prop.prop[key];
        } else {
            prop0 = prop[key];
        }
        onlyChild = replaceNode(prop0, chosenNode, propArgs, currentHeight + 1);
    } else if (key == "and" || key == "or" || key == "iff" || key == "cond") {
        if (prop.prop) {
            prop0 = prop.prop[key][0];
            prop1 = prop.prop[key][1];
        } else {
            prop0 = prop[key][0];
            prop1 = prop[key][1];
        }
        leftChild = replaceNode(prop0, chosenNode, propArgs, currentHeight + 1);
        rightChild = replaceNode(prop1,chosenNode,propArgs,currentHeight + 1);
    }
    if (onlyChild) {
        propKey[key] = onlyChild;
    } else {
        propKey[key] = [leftChild, rightChild];
    }
    return propKey;
}

exports.evolutionStrategy = function evolutionStrategy(rng, truthTable, steps, count, propArgs){
    let step = 0;
    let population = exports.initialPopulation(rng, propArgs, count);
    population = exports.assessPopulation(population, truthTable);
    let best = Math.max(...population.map((individual) => {
        return individual.fitness
    }));
    while (best < 1 && step < steps) {
        step += 1;
        selectedProp = exports.selection(rng, population);
        population = population.map((individual) => {
            return {prop: exports.mutation(rng, individual.prop, propArgs), fitness: NaN};
        });
        population = exports.assessPopulation(population, truthTable);
        best = Math.max(...population.map((individual) => {
            return individual.fitness
        }));
    }

    return population;
}
