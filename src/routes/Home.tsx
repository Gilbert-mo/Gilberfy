import { Link, useLoaderData } from 'react-router-dom'
import { getTopTracks } from '../api/fetchAPI'
import { Track } from "../types"

export async function loader() {
  try {
    const topTracks: Track[] = (await getTopTracks()).items
    console.log(topTracks)
    return { topTracks }

  } catch (err) {
    console.log('Oh no... error loader date', err)
    return { topTracks: [] }
  }
}

function Home() {

  const { topTracks } = useLoaderData() as { topTracks: Track[] };

  if (!topTracks) {
    return <div>Error loading data...</div>;
  }

  return (
    <div className="p-4 bg-purple-900">
      <h1 className="text-xl text-white font-bold mb-3">¡Tus {topTracks.length} mejores canciones!</h1>
      {
        topTracks && topTracks.length > 0 ? (
          topTracks?.map(({ name, artists, id }, index) => (
            <section className="flex" key={id}>
              <div className="flex justify-center items-center mr-5">
                <h2 className="text-4xl text-green-300 font-bold">{index + 1}</h2>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-300">{name}</h2>
                {/* <p className="text-white">{artists.map(artist => artist.name).join(', ')}</p> */}
                <div>
                  {artists.map((artist, idx) => (
                    <span key={artist.id}>
                      <Link key={index} to={`/artist/${artist.id}`} className='hover:underline'>{artist.name}</Link>
                      { idx < artists.length - 1 && ', ' }
                      {/* agrega un coma despues de cada item menos al ultimo */}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          ))
        ) : (
          <div>Loading...</div>
        )
      }
    </div>
  )
}

export default Home
