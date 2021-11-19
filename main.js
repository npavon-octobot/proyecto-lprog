var utils = require('./utils')
var phase0 = require('./phase0')
var phase1 = require('./phase1')

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
console.log("-------- FITNESS TEST START -------------");
console.log(" ");

// -----------------------------------
// -----------------------------------
// randomSearch TEST:
// -----------------------------------
// -----------------------------------

while(countMax > 0) {
	console.log(`randomSearch with count= ${countMax}`);
	console.log(JSON.stringify(phase1.randomSearch(utils.rng, truthTableExample2, countMax, propArgs)));
	countMax -= 1;
}

// -----------------------------------
// -----------------------------------
// PHASE 1 TESTS FINISH
// -----------------------------------
// -----------------------------------

