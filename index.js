const turf = require('@turf/turf')
const fs = require('fs')
const myLine = require('./myLine.json')
const texasEagleAllFeatures = require('./texaseagle.json')

// Some simple tests to make sure it's configured right. Interestingly, the return values of pointToLineDistance and nearestPointOnLine are off by just a little bit (~1.5 miles, probably not enough to matter at the moment).
const bkCoords = [-73.9585526, 40.6764563]
const distance = turf.pointToLineDistance(bkCoords, myLine, {units: 'miles'})
console.log(distance)
const nearestPoint = turf.nearestPointOnLine(myLine, bkCoords, {units: 'miles'})
console.log(nearestPoint)

// Springfield, IL Amtrak station coordinates
const SPIStation = [-89.6518184, 39.8023754]

// Rough attempt at reducing the Texas Eagle route data (which currently contains a point for every station, grade crossing and pretty much everything else) down to just the actual route. Probably not the right way of doing this.
const texasEagleRoute = turf.featureReduce(texasEagleAllFeatures, function (acc, currentFeature) {
  if(currentFeature.geometry.type === 'LineString') return [...acc,...currentFeature.geometry.coordinates]
  return previousValue
},[])

console.log('texas eagle route length:', texasEagleRoute.length)
const nearestPointToSPI = turf.nearestPointOnLine(turf.lineString(texasEagleRoute), SPIStation, {units: 'miles'})
//Springfield station should be at MP ~185.1. This fails, possibly because turf.featureReduce is putting the points out of order? That would cause turf.nearestPointOnLine to think it's a lot farther to SPI than it really is.
console.log(nearestPointToSPI)
