const turf = require('@turf/turf')
const chai = require('chai')
const expect = chai.expect
const GJV = require('geojson-validation')

// Some simple tests to make sure it's configured right. Interestingly, the return values of pointToLineDistance and nearestPointOnLine are off by just a little bit (~1.5 miles, probably not enough to matter at the moment).
describe('Basic geo functions', () => {
  describe('a line near Brooklyn', () => {
    it('is a LineString', () => {
      let myLine = require('./myLine.json')
      expect(GJV.isLineString(myLine)).to.be.true
    })
    it('is actually near Brooklyn', () => {
      let myLine = require('./myLine.json')
      let bkCoords = [-73.9585526, 40.6764563]
      expect(turf.pointToLineDistance(bkCoords, myLine, {units: 'miles'})).to.equal(128.2635695763742)
    })
    it('contains the closest point to Brooklyn at MP 143.61555320057244 miles', () => {
      let myLine = require('./myLine.json')
      let bkCoords = [-73.9585526, 40.6764563]
      expect(turf.nearestPointOnLine(myLine, bkCoords, {units: 'miles'}).properties.location).to.equal(143.61555320057244)
    })
  })
})

describe('The Texas Eagle', () => {
  let texasEagle = require('./texaseagle-dissolved-ls.json')
  it('has a route length of 2728 miles', () => {
    expect(turf.length(texasEagle)).to.be.within(2728,2729)
  })
})

describe('SPI station', () => {
  let texasEagle = require('./texaseagle-dissolved-ls.json')
  // Springfield, IL Amtrak station coordinates
  let SPIStation = [-89.6518184, 39.8023754]

  it('lies on the Texas Eagle route', () => {
    let nearestPointToSPI = turf.nearestPointOnLine(texasEagle, SPIStation, {units: 'miles'})
    expect(nearestPointToSPI.properties.dist).to.equal(0)
  })

  it('lies at MP 185.1 on the Texas Eagle route', () => {
    let nearestPointToSPI = turf.nearestPointOnLine(texasEagle, SPIStation, {units: 'miles'})
    // Springfield station should be at MP ~185.1.
    expect(nearestPointToSPI.properties.location).to.be.within(185,186)
  })
})
