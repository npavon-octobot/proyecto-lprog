var phase0 = require('./phase0')

exports.fitness = function fitness(prop, truthTable){
	let count = 0;
	truthTable.forEach(function(caso) {
		if(phase0.evalProp(prop, caso[0]) == caso[1]){
			count ++;
		}
	});
	return count;
};


exports.randomSearch = function randomSearch(rng, truthTable, count, propArgs){
	let step = 0;
	let bestProp = null;
	let bestFitness = Number.MIN_SAFE_INTEGER;
	while(bestFitness<truthTable.length && step < count){
		step++;
		let prop = phase0.randomProp(rng, propArgs.vars, propArgs.maxHeight, propArgs.minHeight);
		let currentFitness = exports.fitness(prop, truthTable);
		if(currentFitness>bestFitness){
			bestProp = prop;
			bestFitness = currentFitness;
		}
	}
	return [bestProp, bestFitness];
}
