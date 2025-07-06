import { NextResponse } from 'next/server';

export async function GET() {
const hospitals = [
{
name: 'Lion’s Eye Hospital',
address: 'CRPF Square, Bhubaneswar',
lat: 20.283089,
lng: 85.833706,
beds: { general: 8, icu: 0, emergency: 1, maternity: 3,},
wait: '10–20 min',
Time: '8 min',
distance: '1.2 km',
distanceKm: 1.2,
},
{
name: 'Millennium Hospitals Pvt. Ltd.',
address: 'Near Gandhi Chhak, Bhubaneswar',
lat: 20.27018,
lng: 85.82296,
beds: { general: 14, icu: 3, emergency: 2, maternity: 0, },
wait: '15–25 min',
Time: '12 min',
distance: '2.3 km',
distanceKm: 2.3,
},
{
name: 'Gastro and Kidney Care Hospital',
address: 'Saheed Nagar, Bhubaneswar',
lat: 20.2713,
lng: 85.8278,
beds: { general: 0, icu: 14, emergency: 8, maternity: 5, },
wait: '10–15 min',
Time: '16 min',
distance: '2.0 km',
distanceKm: 2.0,
},
{
name: 'ESI Hospital',
address: 'Jayadev Vihar Road, Bhubaneswar',
lat: 20.2952,
lng: 85.8406,
beds: { general: 20, icu: 4, emergency: 0, maternity: 2, },
wait: '5–10 min',
Time: '5 min',
distance: '1.1 km',
distanceKm: 1.1,
},
{
name: 'Police Hospital',
address: 'Jayadev Vihar, Bhubaneswar',
lat: 20.2875,
lng: 85.8377,
beds: { general: 6, icu: 1, emergency: 1, maternity: 6,},
wait: '15–20 min',
Time: '10 min',
distance: '1.6 km',
distanceKm: 1.6,
},
];

return NextResponse.json(hospitals);
}
