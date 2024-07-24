import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import { getArtist } from "../api/fetchAPI"
import { Artist as ArtistTye } from '../types'
import { FaPlay } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { FaGithub } from "react-icons/fa";


// interface ArtistParams {
//     artistId: string;
// }

export async function loader({ params }: LoaderFunctionArgs): Promise<{ artist: ArtistTye | null }> {
    try {

        if (!params.artistId)
            throw new Error('Missing artistId')

        const artist = await getArtist(params.artistId)
        console.log(artist)
        return { artist }
    } catch (err) {
        console.log('Error loader artist', err)
        return { artist: null }
    }
}

function Artist() {

    const { artist } = useLoaderData() as { artist: ArtistTye };
    // console.log('Desde Comonente Artist', artist)

    if (!artist) {
        return <div>Error al cargar el artista</div>;
    }

    function getRandomNumberBetween20MAnd90M() {
        const min = 20000000;
        const max = 90000000;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber.toLocaleString('en-US'); // Formatea el número con comas
    }

    return (
        <div>
            <div className="aspect-video">
                {artist.images && artist.images.length > 0 ? (
                    <img className="object-cover h-full w-full" src={artist.images[0].url} alt={artist.name} />
                ) : (
                    <div>No Image Available</div>
                )}
                <div className="flex flex-col gap-3 p-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex  gap-6">
                            
                            <h1 className="text-8xl font-extrabold hover:text-green-500 transition-colors">{artist.name}</h1>

                            <div className="flex items-center justify-center gap-6">
                                <button className="w-20 h-20 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center text-3xl hover:scale-105 text-black">
                                    <FaPlay />
                                </button>
                                <button className="hover:scale-105 text-center font-bold border border-gray-200 py-1 px-3 rounded-full">
                                    Following
                                </button>
                                <button className="text-2xl text-gray-400 hover:text-white">
                                    <SlOptions />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2">
                            {
                                artist.genres?.map((e, idx) => (
                                    <span className="font-bold border border-gray-200 py-1 px-3 rounded-full" key={idx}>{e}</span>
                                ))
                            }
                        </div>
                    </div>
                    <p className="font-bold text-lg">
                        {getRandomNumberBetween20MAnd90M()} listeners
                    </p>
                    <p>{artist.followers.total.toLocaleString('en-US')}</p>

                    <p>Coldplay are a British rock band formed in London in 1997, consisting of vocalist and pianist Chris Martin, lead guitarist Jonny Buckland, bassist Guy Berryman, drummer and percussionist Will Champion, and manager Phil Harvey. They are best known for their live performances, having also impacted popular culture with their artistry, advocacy and achievements.</p>

                    <a target="_blank" href="https://github.com/Gilbert-mo" className="text-4xl">
                        <FaGithub />
                    </a>
                </div>
            </div >
        </div >
    )
}

export default Artist
