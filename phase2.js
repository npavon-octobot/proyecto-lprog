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
    let mutatedProp = replaceNode(prop, chosenNode, propArgs);
    return mutatedProp;
}

function countNodes(prop){
    if(prop.var){
        return 1;
    }
    key = Object.keys(prop);
    return (countNodes(prop[key][0]) + countNodes(prop[key][1]) + 1);
}

function replaceNode(prop, chosenNode, propArgs, currentHeight = 0){
    if (chosenNode == 0){
        return phase0.randomProp(rng, propArgs.vars, propArgs.maxHeight - currentHeight, 0);
    }

    
    return replaceNode(prop, chosenNode-1, propArgs, currentHeight)
}