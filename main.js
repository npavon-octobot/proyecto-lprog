//EvalProp function give a props and values and return the evaluation of the propocition.
function evalProp(prop, value) {
  const keys = Object.keys(prop);
  if (keys[0] == 'var') {
    return value[prop[keys[0]]];
  } else if (keys[0] == 'neg') {
    return !evalProp(prop[keys[0]], value);
  } else if (keys[0] == 'and') {
    return evalProp(prop[keys[0]][0], value) && evalProp(prop[keys[0]][1], value);
  } else if (keys[0] == 'or') {
    return evalProp(prop[keys[0]][0], value) || evalProp(prop[keys[0]][1], value);
  } else if (keys[0] == 'iff') {
    return evalProp(prop[keys[0]][0], value) == evalProp(prop[keys[0]][1], value);
  } else if (keys[0] == 'cond') {
    return !evalProp(prop[keys[0]][0], value) && !evalProp(prop[keys[0]][1], value);
  } else {
		console.error("Error no existe ese var");
    return "Error paso algo";
  }
}

function randomProp(randomNumber, vars, maxHeight, minHeight) {
	const props = ["var", "neg", "and", "or", "iff", "cond"];
	const randomVarKey = Object.keys(vars)[0];
	if (maxHeight < 1) {
		return {"var": vars[`${randomVarKey}`]};
	} else if (maxHeight >= 1) {
		if (props[randomNumber] == "var") {
			if (minHeight > 1) {
				return randomProp(rng(randomNumber), vars, maxHeight, minHeight);
			} else {
				return {"var": vars[`${randomVarKey}`]};
			}
		} else if (props[randomNumber] == 'neg') {
			return {"neg": randomProp(rng(randomNumber), vars, maxHeight-1, minHeight-1)};
		} else if (props[randomNumber] == 'and') {
			return {"and": [randomProp(rng(randomNumber), vars, maxHeight-1, minHeight-1), randomProp(rng(randomNumber-1), vars, maxHeight-1, minHeight-1)]};
		} else if (props[randomNumber] == 'or') {
			return {"or": [randomProp(rng(randomNumber), vars, maxHeight-1, minHeight-1), randomProp(rng(randomNumber-1), vars, maxHeight-1, minHeight-1)]};
		} else if (props[randomNumber] == 'iff') {
			return {"iff": [randomProp(rng(randomNumber), vars, maxHeight-1, minHeight-1), randomProp(rng(randomNumber-1), vars, maxHeight-1, minHeight-1)]};
		} else if (props[randomNumber] == 'cond') {
			return {"cond": [randomProp(rng(randomNumber), vars, maxHeight-1, minHeight-1), randomProp(rng(randomNumber-1), vars, maxHeight-1, minHeight-1)]}
		} else {
			console.error("Error no existe ese var");
			return "Error paso algo";
		}
	}
}

function rng(semilla) {
	if (semilla == 1) {
		return 2;
	} else if (semilla == 2) {
		return 0;
	} else if (semilla == 3) {
		return 4;
	} else if (semilla == 4) {
		return 1;
	} else if (semilla == 5) {
		return 3;
	} else {
		return 0;
	}
}

const ejemplo = {and: [{var: "p"}, {or: [{var: "q"}, {var: "p"}]}]};
assign2 = {"p": true, "q": false};
console.log(randomProp(rng(1), assign2, 3, 1));
//truthTable return an array of the truth table of a prop with their result.
function truthTable(props, vars) {
  let allCombinations = createVariableCombinations(vars);

  let result = [];
  for (let combination in allCombinations) {
    result.push([allCombinations[combination], evalProp(props, allCombinations[combination])]);
  }

  return result;
}

//Creates all combintaions from the variables
function createVariableCombinations(vars) {
  var len = vars.length
		,splitBy = Math.round(len/2)
		,trueSet
		,trues = []
		,truthData = [];

  truthData.push(truth(vars, vars, true));
	for(var i=1; i<=splitBy; i++) {
		trueSet = reduceToCombinations(permut(vars, i));

		trueSet.forEach((truthSrc)=>{
			trues = truth(vars, truthSrc);
			truthData.push(trues);
		});
	}
	if (vars.length > 1) {
    truthData.push(truth(vars, vars));
  }

  return truthData;
}

//Create all the permutations of the value, if value [a, b] return [ab, ba]
function permut(vars, count) {
	var buf = []
		,variableLength
		,arrSlice
		,permArr
		,proArr;
	if (count <= 1) {
		return vars;
	} else {
		variableLength = vars.length;
		for (var i = 0; i < variableLength; i++) {
			arrSlice = vars.slice(0,i).concat(vars.slice(i+1));
			permArr = permut(arrSlice, count-1);
			proArr = [];
			for(var y=0; y<permArr.length; y++) {
				proArr.push([vars[i]].concat(permArr[y]).join(''));
			}
			buf.push(...proArr);
		}
	}

	return buf;
}

//the one that generates from the variables [a, b] another set telling which is true and which is false and a reverse if necessary how it should look
// example truth(['a', 'b'], ['a', 'b']) => {a: 1, b: 1}, truth(['a', 'b'], ['a', 'b'], true) => {a: 0, b: 0}
function truth(set, truths, reverse) {
	var w = {};

	set.forEach(v=>w[v]=(truths.indexOf(v)>=0 ? true : false)^reverse);

	return w;
}

//the one that generates from ["ab", "ba"] to [{a: 0, b: 0}, {a: 0, b: 1}, {a: 1, b: 0}, {a: 1, b: 1}]
function reduceToCombinations(arr) {
	var count = 1, lastEl;

	arr = arr.map((v) => {
		return v.split('').sort().join('')
	}).sort();

	lastEl = arr[0];
	while (count < arr.length) {
		if (arr[count] == lastEl) {
			arr.splice(count,1);
		} else {
			lastEl = arr[count];
			count++;
		}
	}

	arr = arr.map(v=>{return v.split('')});

	return arr;
}

assign = {"p": true, "q": false};
//console.log(`Creating Eval Prop of: ${JSON.stringify(assign)}`);
//console.log(evalProp({and: [{var: "p"}, {or: [{var: "q"}, {var: "p"}]}]}, assign));

//console.log("Creating Truth Table")
//console.log(truthTable({and: [{var: "a"}, {or: [{var: "b"}, {var: "b"}]}]}, ["a", "b"]));
