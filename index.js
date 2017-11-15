const turf = require('@turf/turf')
const myLine = require('./myLine.json')

const bkCoords = [-73.9585526, 40.6764563]

const distance = turf.pointToLineDistance(myCoords, myLine, {units: 'miles'})

console.log(distance)
