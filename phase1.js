var phase0 = require('./phase0')

exports.fitness = function fitness(prop, truthTable){
	let count = 0;
	truthTable.forEach(function(caso) {
		if(phase0.evalProp(prop, caso[0]) == caso[1]){
			count ++;
		}
	});
	return count/truthTable.length;
};


exports.randomSearch = function randomSearch(rng, truthTable, count, propArgs){
	let step = 0;
	let bestProp = null;
	let bestFitness = Number.MIN_SAFE_INTEGER;
	while(bestFitness < 1 && step < count){
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

exports.randomTruthTable = function randomTruthTable(rng, vars, propArgs) {
  let prop = phase0.randomProp(rng, propArgs.vars, propArgs.maxHeight, propArgs.minHeight);
  return [prop, phase0.truthTable(prop, vars)];
}
