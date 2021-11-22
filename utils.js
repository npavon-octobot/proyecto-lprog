const testSeed = 123;

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
