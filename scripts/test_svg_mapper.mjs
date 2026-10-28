import fs from 'fs';
import path from 'path';
import { getTrackSvg } from '../frontend/src/utils/trackSvgMapper.js';

const publicSvgs = fs.readdirSync('frontend/public/track_svgs');
console.log('Total SVGs in public directory:', publicSvgs.length);

const testCircuits2023 = [
  { name: 'Bahrain Grand Prix', location: 'Sakhir', id: '2023-1' },
  { name: 'Saudi Arabian Grand Prix', location: 'Jeddah', id: '2023-2' },
  { name: 'Australian Grand Prix', location: 'Melbourne', id: '2023-3' },
  { name: 'Azerbaijan Grand Prix', location: 'Baku', id: '2023-4' },
  { name: 'Miami Grand Prix', location: 'Miami', id: '2023-5' },
  { name: 'Monaco Grand Prix', location: 'Monaco', id: '2023-6' },
  { name: 'Spanish Grand Prix', location: 'Barcelona', id: '2023-7' },
  { name: 'Canadian Grand Prix', location: 'Montreal', id: '2023-8' },
  { name: 'Austrian Grand Prix', location: 'Spielberg', id: '2023-9' },
  { name: 'British Grand Prix', location: 'Silverstone', id: '2023-10' },
  { name: 'Hungarian Grand Prix', location: 'Budapest', id: '2023-11' },
  { name: 'Belgian Grand Prix', location: 'Spa-Francorchamps', id: '2023-12' },
  { name: 'Dutch Grand Prix', location: 'Zandvoort', id: '2023-13' },
  { name: 'Italian Grand Prix', location: 'Monza', id: '2023-14' },
  { name: 'Singapore Grand Prix', location: 'Marina Bay', id: '2023-15' },
  { name: 'Japanese Grand Prix', location: 'Suzuka', id: '2023-16' },
  { name: 'Qatar Grand Prix', location: 'Lusail', id: '2023-17' },
  { name: 'United States Grand Prix', location: 'Austin', id: '2023-18' },
  { name: 'Mexico City Grand Prix', location: 'Mexico City', id: '2023-19' },
  { name: 'São Paulo Grand Prix', location: 'São Paulo', id: '2023-20' },
  { name: 'Las Vegas Grand Prix', location: 'Las Vegas', id: '2023-21' },
  { name: 'Abu Dhabi Grand Prix', location: 'Yas Island', id: '2023-22' }
];

let allPassed = true;
for (const c of testCircuits2023) {
  const resultSvg = getTrackSvg(c);
  const baseName = path.basename(resultSvg);
  const exists = publicSvgs.includes(baseName);
  console.log(`[${c.id}] ${c.name} (${c.location}) -> ${baseName} (Exists: ${exists})`);
  if (!exists || baseName === 'f1-generic.svg') {
    allPassed = false;
  }
}
console.log('2023 Circuits Mapping All Passed:', allPassed);

// Test some classic historical circuits
const historical = [
  { name: 'Portuguese Grand Prix', location: 'Portimão', id: 'portimao' },
  { name: 'German Grand Prix', location: 'Hockenheim', id: 'hockenheim' },
  { name: 'Eifel Grand Prix', location: 'Nürburgring', id: 'nurburgring' },
  { name: 'Tuscan Grand Prix', location: 'Mugello', id: 'mugello' },
  { name: 'Malaysian Grand Prix', location: 'Sepang', id: 'sepang' },
  { name: 'Indian Grand Prix', location: 'Buddh International Circuit', id: 'india' },
  { name: 'United States Grand Prix', location: 'Indianapolis', id: 'indianapolis' },
  { name: 'South African Grand Prix', location: 'Kyalami', id: 'kyalami' },
  { name: 'French Grand Prix', location: 'Magny-Cours', id: 'magny-cours' },
  { name: 'San Marino Grand Prix', location: 'Imola', id: 'imola' }
];

for (const c of historical) {
  const resultSvg = getTrackSvg(c);
  const baseName = path.basename(resultSvg);
  const exists = publicSvgs.includes(baseName);
  console.log(`[Historical] ${c.name} (${c.location}) -> ${baseName} (Exists: ${exists})`);
  if (!exists || baseName === 'f1-generic.svg') {
    allPassed = false;
  }
}
console.log('Final Verification Status:', allPassed ? 'ALL CIRCUITS PASSED' : 'SOME FAILED');
