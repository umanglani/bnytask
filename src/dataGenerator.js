/*
  The below logic is used to generate random data
  1. defined secotrs
  2. defined countries
  3. defined date range
  4. generate random values for each country, per sector, for given date
*/

export const sectors = [
  { name: 'Basic Material', color: '#8CBAD1' }, 
  { name: 'Communications', color: '#70D64E' },
  { name: 'Consumer,Cyclical', color: '#EF7087' },
  { name: 'Consumer,Non-cyclical', color: '#DDA335' },
  { name: 'Diversified', color: '#D981D5' },
  { name: 'Engery', color: '#82CE8C' },
  { name: 'Financial', color: '#839BE6' },
  { name: 'Industrial', color: '#C6D445' },
  { name: 'Technology', color: '#C3B66B' },
  { name: 'Utilities', color: '#D1A7CC' }
]

const countries = [
  'US',
  'GB',
  'NL',
  'AU',
  'NZ',
  'MY',
  'DE',
  'SE',
  'IN',
  'SG',
  'UK',
  'SL',  
  'MX',
  'TW',
  'JP',
  'RU',
  'PH',
  'CA',
  'PB'  
]

export let DateRange = [
  '2017-05-29',
  '2017-05-30',
  '2017-06-01',
  '2017-06-02',
  '2017-06-03',
  '2017-06-04',
  '2017-06-05',
  '2017-06-06',
  '2017-06-07',
  '2017-06-08',
  '2017-06-09',
  '2017-06-10',
]

// the main function called from outside
export const GenerateData = (sectorDate) => {
  let data = {}

  // creating root
  data["name"] = 'BNY Task'
  data["children"] = []

  let tempSectorArray = []
  // generate random data for each sector
  sectors.map( (sector) => {
    return tempSectorArray.push(GenerateSectorData(sector))
  })

  // insert sector data into main data object
  data.children.push({
    name: sectorDate,
    children: tempSectorArray
  })

  return data
}

// generates data for given sector
const GenerateSectorData = (sector) => {
  // generate country data, create sector object 
  let countryData = GenerateCountryData()
  let sectorData = { 'name': sector.name, color: sector.color, children: countryData}
  return sectorData
}

// generates data for each country with random value between 1-15000
const GenerateCountryData = () => {
  let countryData = []
  
  countries.map ( (country) => {
    const countryValue = GetRandom(15000)
    return countryData.push({'name' : country, value: countryValue})
  })

  return countryData
}

const GetRandom = (max) => {
  return Math.floor(Math.random() * max)
}
