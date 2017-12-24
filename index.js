const turf = require('@turf/turf')
const fs = require('fs')
const myLine = require('./myLine.json')
const texasEagleAllFeatures = require('./texaseagle.json')
const texasEagleStripped = require('./texaseagle_stripped.json')
const texasEagleDissolved = require('./texaseagle-dissolved-ls.json')

// Some simple tests to make sure it's configured right. Interestingly, the return values of pointToLineDistance and nearestPointOnLine are off by just a little bit (~1.5 miles, probably not enough to matter at the moment).
// const bkCoords = [-73.9585526, 40.6764563]
// const distance = turf.pointToLineDistance(bkCoords, myLine, {units: 'miles'})
// console.log(distance)
// const nearestPoint = turf.nearestPointOnLine(myLine, bkCoords, {units: 'miles'})
// console.log(nearestPoint)

// Springfield, IL Amtrak station coordinates
const SPIStation = [-89.6518184, 39.8023754]

// console.log('texas eagle stripped prop names:', Object.getOwnPropertyNames(texasEagleStripped))
// console.log('texas eagle has', texasEagleStripped.features.length,'features')

// const texasEagleWays = texasEagleStripped.features.reduce((acc, val) => {
//   return [...acc,...val.geometry.coordinates]
// },[])

// console.log(texasEagleWays)

console.log('texas eagle stripped route length:', turf.length(texasEagleDissolved))


const nearestPointToSPI = turf.nearestPointOnLine(texasEagleDissolved, SPIStation, {units: 'miles'})
// Springfield station should be at MP ~185.1. This fails, possibly because turf.featureReduce is putting the points out of order? That would cause turf.nearestPointOnLine to think it's a lot farther to SPI than it really is.
console.log(nearestPointToSPI)
console.log(turf.length(texasEagleDissolved)-nearestPointToSPI.properties.location)
