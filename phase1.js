var phase0 = require('./phase0')
var utils = require('./utils')

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
		console.log("Step: ", step);
		step++;
		let prop = phase0.randomProp(rng, propArgs.vars, propArgs.maxHeight, propArgs.minHeight);
		console.log("Random Prop to use for fitness check: ", utils.simplifyProposition(prop));
		let currentFitness = exports.fitness(prop, truthTable);
		console.log("Fitness:", currentFitness);
		if(currentFitness > bestFitness){
			bestProp = prop;
			bestFitness = currentFitness;
		}
	}
	return [bestProp, bestFitness];
}

exports.randomTruthTable = function randomTruthTable(rng, vars) {
	let varsCombinations = phase0.createVariableCombinations(vars);
	let truthTable = [];
	varsCombinations.forEach(vars => {
		truthTable.push([vars, utils.turnToIntBetween(rng(), 1, 0)])
	})

  return truthTable;
}
