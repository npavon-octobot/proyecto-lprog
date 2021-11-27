var utils = require('./utils')
var phase0 = require('./phase0')
var phase1 = require('./phase1')
var phase2 = require('./phase2')

// -----------------------------------
// -----------------------------------
// PHASE 0 TESTING
// -----------------------------------
// -----------------------------------
const assign = {"p": true, "q": false};
const props = [
	{var: "p"},
	{var: "q"},
	{neg: {var: "p"}},
	{neg: {var: "q"}},
	{and: [{var: "p"}, {var: "q"}]},
	{and: [{var: "p"}, {var: "p"}]},
	{or: [{var: "p"}, {var: "q"}]},
	{and: [{var: "q"}, {var: "q"}]},
	{iff: [{var: "p"}, {var: "q"}]},
	{iff: [{var: "q"}, {var: "q"}]},
	{cond: [{var: "p"}, {var: "q"}]},
	{cond: [{var: "p"}, {var: "p"}]}
]
const variables = ["p", "q"];
const propComplejo = {neg: {or: [{var: "q"},{var:"q"}] }};
// -----------------------------------
// -----------------------------------
// evalProp TEST:
// -----------------------------------
// -----------------------------------


console.log(" ");
console.log("-------- EVAL PROP TEST START -------------");
console.log(`Creating Eval Prop of: ${JSON.stringify(assign)}`);
props.forEach(prop => {
	console.log(`${JSON.stringify(prop)}: ${phase0.evalProp(prop, assign)}`);
});
console.log(`Creating Eval Prop for: ${JSON.stringify(propComplejo)}`);
console.log("Testing if result is correct:")
console.log(phase0.evalProp(propComplejo, assign) == true ? "PASS" : "FAIL");
console.log("-------- EVAL PROP TEST FINISH -------------");
console.log(" ");

// -----------------------------------
// -----------------------------------
// truthTable TEST:
// -----------------------------------
// -----------------------------------


console.log(" ");
console.log("-------- TRUTH TABLE TEST START -------------");
console.log(`Creating Truth Table for ${variables}`)
props.forEach(prop => {
	console.log(`Truth table for: ${JSON.stringify(prop)}`)
	console.log(phase0.truthTable(prop, variables));
});
console.log("Testing more complex prop, truth table for: ", JSON.stringify(propComplejo));
console.log(phase0.truthTable(propComplejo, variables));
const truthTableResult = [true, true, false, false];
console.log(phase0.truthTable(propComplejo, variables).map((element, index) => element[1] == truthTableResult[index]));
console.log(phase0.truthTable(propComplejo, variables).map((element, index) => element[1] == truthTableResult[index]) ? "PASSED" : "FAIL");

console.log("-------- TRUTH TABLE TEST FINISH -------------");
console.log(" ");

// -----------------------------------
// -----------------------------------
// randomProp TEST:
// -----------------------------------
// -----------------------------------


console.log(" ");
console.log("-------- RANDOM PROP TEST START -------------");
console.log("Seed inicial:", 2);
console.log(JSON.stringify(phase0.randomProp(utils.rng, assign, 3, 1)));
//console.log("Seed inicial:", 3);
//console.log(JSON.stringify(phase0.randomProp(utils.rng, assign, 4, 2)));
//console.log("Seed inicial:", 4);
//console.log(JSON.stringify(phase0.randomProp(utils.rng, assign, 10, 5)));
console.log("-------- RANDOM PROP TEST FINISH -------------");
console.log(" ");

// -----------------------------------
// -----------------------------------
// PHASE 0 TESTS FINISH
// -----------------------------------
// -----------------------------------


// -----------------------------------
// -----------------------------------
// PHASE 1 TESTS
// -----------------------------------
// -----------------------------------
const truthTableExample = phase0.truthTable({and: [{var: "p"}, {or: [{var: "q"}, {var: "q"}]}]}, ["p", "q"]);
const truthTableExample2 = phase0.truthTable({var: "p"}, ["p", "q"]);
const propArgs = {vars: assign, maxHeight: 2, minHeight: 1};
var countMax = 5;

// -----------------------------------
// -----------------------------------
// fitness TEST:
// -----------------------------------
// -----------------------------------


console.log(" ");
console.log("-------- FITNESS TEST START -------------");
props.forEach(prop => {
	console.log(`Fitness For: ${JSON.stringify(prop)}`)
	console.log(truthTableExample);
	console.log(phase1.fitness(prop, truthTableExample));
});
console.log("-------- FITNESS TEST FINISH -------------");
console.log(" ");

// -----------------------------------
// -----------------------------------
// randomSearch TEST:
// -----------------------------------
// -----------------------------------


console.log(" ");
console.log("-------- RANDOM SEARCH TEST START -------------");
console.log("Truth Table");

let truthTableExample4 = phase0.truthTable({cond: [{var: "p"}, {or: [{var: "p"}, {var: "p"}]}]}, ["p"]);
let truthTableExample5 = phase0.truthTable({neg: {iff: [{var: "p"}, {or: [{var: "p"}, {var: "p"}]}]}}, ["p"]);
let truthTableExample6 = phase0.truthTable({and: [{var: "p"}, {or: [{var: "p"}, {var: "p"}]}]}, ["p"]);
let truthTableExample7 = phase0.truthTable({or: [{var: "p"}, {or: [{var: "p"}, {var: "p"}]}]}, ["p"])

console.log("------------------ START OF COUNT ", countMax, " -------------------------");
console.log("Truth Table")
console.log(JSON.stringify(truthTableExample4));
const randomSearchResponse1 = phase1.randomSearch(utils.rng, truthTableExample, countMax, propArgs);
console.log(`With Fitness: ${randomSearchResponse1[1]*100}% effectiveness`);
console.log("------------------ END OF COUNT ", countMax, " ------------------------");

console.log("------------------ START OF COUNT ", countMax, " -------------------------");
console.log("Truth Table")
console.log(JSON.stringify(truthTableExample5));
const randomSearchResponse2 = phase1.randomSearch(utils.rng, truthTableExample, countMax, propArgs);
console.log(`With Fitness: ${randomSearchResponse2[1]*100}% effectiveness`);
console.log("------------------ END OF COUNT ", countMax, " ------------------------");

console.log("------------------ START OF COUNT ", countMax, " -------------------------");
console.log("Truth Table")
console.log(JSON.stringify(truthTableExample6));
const randomSearchResponse3 = phase1.randomSearch(utils.rng, truthTableExample, countMax, propArgs);
console.log(`With Fitness: ${randomSearchResponse3[1]*100}% effectiveness`);
console.log("------------------ END OF COUNT ", countMax, " ------------------------");

console.log("------------------ START OF COUNT ", countMax, " -------------------------");
console.log("Truth Table")
console.log(JSON.stringify(truthTableExample7));
const randomSearchResponse4 = phase1.randomSearch(utils.rng, truthTableExample, countMax, propArgs);
console.log(`With Fitness: ${randomSearchResponse4[1]*100}% effectiveness`);
console.log("------------------ END OF COUNT ", countMax, " ------------------------");

console.log("-------- RANDOM SEARCH TEST FINISH -------------");
console.log(" ");


console.log(" ");
console.log("-------- RANDOM TRUTH TABLE TEST START -------------");
const randomTruthTableResponse = phase1.randomTruthTable(utils.rng, variables);
console.log("You get this truth table:");
console.log(randomTruthTableResponse);
console.log("-------- RANDOM TRUTH TABLE TEST FINISH -------------");
console.log(" ");

// -----------------------------------
// -----------------------------------
// PHASE 1 TESTS FINISH
// -----------------------------------
// -----------------------------------



// -----------------------------------
// -----------------------------------
// PHASE 2 TESTS
// -----------------------------------
// -----------------------------------


const initialPopulation = phase2.initialPopulation(utils.rng, propArgs, 10)
console.log(" ");
console.log("-------- INITIAL POPULATION TEST START -------------");
console.log("This is the initialPopulation");
console.log(JSON.stringify(initialPopulation));
console.log("-------- INITIAL POPULATION TEST FINISH -------------");
console.log(" ");


const assessPopulation = phase2.assessPopulation(initialPopulation, truthTableExample2);
console.log(" ");
console.log("-------- ASSESS POPULATION TEST START -------------");
console.log("This is the assess population from the initial population");
console.log(assessPopulation);
console.log(" ")
console.log(JSON.stringify(assessPopulation));
console.log("-------- ASSESS POPULATION TEST FINISH -------------");
console.log(" ");

const seleccionPopulation = phase2.selection(utils.rng, assessPopulation);
console.log(" ");
console.log("-------- SELECCION POPULATION TEST START -------------");
console.log("This is one seleccion of Population:");
console.log(seleccionPopulation);
console.log(" ");
console.log(JSON.stringify(seleccionPopulation));
console.log("-------- SELECCION POPULATION TEST FINISH -------------");
console.log(" ");


console.log(" ");
console.log("-------- SELECCION MUTATION TEST START -------------");
const propArgs2 = {vars: assign, maxHeight: 4, minHeight: 1};
const propExample = {and: [{var: "p"}, {iff: [{iff: [{var: "p"}, {var: "q"}]},{var: "q"}]}]};
const propExample2 = {or: [{var: "p"}, {var: "q"}]};
const propExample3 = {neg:{and:[{var:"q"},{var:"p"}]}};
console.log(`From prop ${JSON.stringify(propExample)}`);
console.log("To mutated:")
console.log(JSON.stringify(phase2.mutation(utils.rng, propExample, propArgs2 )));
console.log("-------- SELECCION MUTATION TEST FINISH -------------");
console.log(" ");

const truthTableExample3 = phase0.truthTable({cond: [{var: "p"}, {or: [{var: "q"}, {var: "q"}]}]}, ["p", "q"]);

console.log(" ");
console.log("-------- EVOLUTION STRATEGY TEST START -------------");
console.log("This is the evolution strategy for this truthTable: ")
console.log(truthTableExample3);
console.log("The result is:")
console.log(phase2.evolutionStrategy(utils.rng, truthTableExample3, 6, 5, propArgs));
console.log("-------- EVOLUTION STRATEGY TEST FINISH -------------");
console.log(" ");

// -----------------------------------
// -----------------------------------
// PHASE 2 TESTS FINISH
// -----------------------------------
// -----------------------------------

//let truthTableExample4 = phase0.truthTable({cond: [{var: "p"}, {or: [{var: "q"}, {var: "q"}]}]}, ["p", "q"]);
//let truthTableExample5 = phase0.truthTable({neg: {iff: [{var: "p"}, {or: [{var: "q"}, {var: "q"}]}]}}, ["p", "q"]);
//let truthTableExample6 = phase0.truthTable({and: [{var: "p"}, {or: [{var: "q"}, {var: "q"}]}]}, ["p", "q"]);
//let truthTableExample7 = phase0.truthTable({or: [{var: "p"}, {or: [{var: "q"}, {var: "q"}]}]}, ["p", "q"]);

//console.log(truthTableExample4);
console.log("STEPS MADE TESTING....");
//console.log(JSON.stringify(phase2.evolutionStrategy(utils.rng, truthTableExample4, 6, 5, propArgs)));
//console.log(phase2.evolutionStrategy(utils.rng, truthTableExample5, 6, 5, propArgs));
//console.log(phase2.evolutionStrategy(utils.rng, truthTableExample6, 6, 5, propArgs));
//console.log(phase2.evolutionStrategy(utils.rng, truthTableExample7, 6, 5, propArgs));

//let oneVar = {"p": true}
//let propArgsOneVar = {vars: oneVar, maxHeight: 2, minHeight: 1};
//truthTableExample4 = phase0.truthTable({cond: [{var: "p"}, {or: [{var: "p"}, {var: "p"}]}]}, ["p"]);
//truthTableExample5 = phase0.truthTable({neg: {iff: [{var: "p"}, {or: [{var: "p"}, {var: "p"}]}]}}, ["p"]);
//truthTableExample6 = phase0.truthTable({and: [{var: "p"}, {or: [{var: "p"}, {var: "p"}]}]}, ["p"]);
//truthTableExample7 = phase0.truthTable({or: [{var: "p"}, {or: [{var: "p"}, {var: "p"}]}]}, ["p"]);
//console.log(JSON.stringify(phase2.evolutionStrategy(utils.rng, truthTableExample4, 6, 5, propArgsOneVar)));
//console.log(phase2.evolutionStrategy(utils.rng, truthTableExample5, 6, 5, propArgsOneVar));
//console.log(phase2.evolutionStrategy(utils.rng, truthTableExample6, 6, 5, propArgsOneVar));
//console.log(phase2.evolutionStrategy(utils.rng, truthTableExample7, 6, 5, propArgsOneVar));
