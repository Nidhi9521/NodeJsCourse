const launches = new Map();
const axios = require('axios');
// const launches=require('./launches.mongo');
var latestFlightNumber = 1;


const launch = {
  flightNumber: 1,
  mission: 'Kepler Exploration X',
  rocket: 'Rocket_1',
  launchDate: new Date('May 5,2023'),
  upcoming: true,
  success: true,
  customers: ['abc', 'xyz'],
};

launches.set(launch.flightNumber, launch);
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

async function populateLaunches() {
  console.log('Downloading launch data...');
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1
          }
        },
        {
          path: 'payloads',
          select: {
            'customers': 1
          }
        }
      ]
    }
  });
  console.log(response.data.docs)
  if (response.status !== 200) {
    console.log('Problem downloading launch data');
    throw new Error('Launch data download failed');
  }
  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc['payloads'];
    const customers = payloads.flatMap((payload) => {
      return payload['customers'];
    });

    const launch = {
      flightNumber: launchDoc['flight_number'],
      mission: launchDoc['name'],
      rocket: launchDoc['rocket'].name,
      launchDate: launchDoc['date_local'],
      upcoming: launchDoc['upcoming'],
      success: launchDoc['success'],
      customers,
    };

    console.log(`${launch.flightNumber} ${launch.mission}`);

    // await saveLaunch(launch);
    // }
  }
}
async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: 'Falcon 1',
    mission: 'FalconSat',
  });
  if (firstLaunch) {
    console.log('Launch data already loaded!');
  } else {
   await populateLaunches();
  }
}


function existLaunchWithId(launchId) {
  return launches.has(launchId);
}

function getAllLaunch() {
  console.log('get launch');
  console.log(launches)
  return Object.fromEntries(launches);
}

function addNewLaunch(launch) {
  latestFlightNumber = latestFlightNumber + 1;
  console.log(launch);
  launches.set(latestFlightNumber, Object.assign(launch, {
    upcoming: true,
    sucess: true,
    customer: ['abc', 'xyz'],
    flightNumber: latestFlightNumber
  })
  );
  console.log(launches);
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.sucess = false;
  return aborted;
}


module.exports = {
  existLaunchWithId,
  abortLaunchById,
  getAllLaunch,
  addNewLaunch,
  loadLaunchData
};