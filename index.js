const turf = require('@turf/turf')
const myLine = require('./myLine.json')

const bkCoords = [-73.9585526, 40.6764563]

const distance = turf.pointToLineDistance(bkCoords, myLine, {units: 'miles'})
console.log(distance)

const closestPoint = turf.nearestPointOnLine(myLine, bkCoords)
console.log(closestPoint)
