const testSeed = 1;

function mulberry32(seed) {
  return function() {
    var t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

exports.rng = mulberry32(testSeed);

exports.turnToIntBetween = function(number, max, min) {
  if (max == undefined || min == undefined || number == undefined){
    console.error("faltan parametros!");
  } else {
    return Math.floor(number * (max - min +1) + min);
  }
}

exports.simplifyProposition = function(prop) {
  return recursiveSimplify(prop);
}

exports.simplifyPopulation = function(pop) {
  const simplifiedPopulation = [];
  pop.forEach(individuo => {
    simplifiedPopulation.push("prop: " + recursiveSimplify(individuo.prop) + " fitness: " + individuo.fitness);
  });
  return simplifiedPopulation;
}

function recursiveSimplify(prop){
  const keys = Object.keys(prop);
  if (keys[0] == 'var'){
    return prop[keys[0]];
  }
  if (keys[0] == 'neg'){
    return "!" + recursiveSimplify(prop[keys[0]]);
  }
  const compuerta = getAbbreviation(keys[0]);
  let arbolIzq;
  let arbolDer;
  if(prop[keys[0]][0]){
    arbolIzq = recursiveSimplify(prop[keys[0]][0]);
  }
  if(prop[keys[0]][1]){
    arbolDer = recursiveSimplify(prop[keys[0]][1]);
  }
  return "(" + arbolIzq + compuerta + arbolDer + ")";
}

function getAbbreviation(compuerta){
  if (compuerta == 'var') {
    return "";
  } else if (compuerta == 'neg') {
    return "!";
  } else if (compuerta == 'and') {
    return "&";
  } else if (compuerta == 'or') {
    return "||";
  } else if (compuerta == 'iff') {
    return "->";
  } else if (compuerta == 'cond') {
    return "<->";
  } else {
    console.error("Error no existe esa compuerta", compuerta);
    return "Error paso algo";
  }
}
