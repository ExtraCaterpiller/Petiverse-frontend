import { useEffect, useState } from "react"
import Image from "next/image"
import { Fredoka } from "next/font/google"

const fredoka = Fredoka({
    weight: ["500", "700"],
    subsets: ["latin"]
})

export default function NFTCard({ tokenId, imageURI, petType, name, height, width }) {
    const [imageURIURl, setImageURIURl] = useState(null)

    useEffect(() => {
        if (imageURI) {
            //const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            const imageURIURL = imageURI.replace("ipfs://", "https://blue-electronic-platypus-701.mypinata.cloud/ipfs/")
            setImageURIURl(imageURIURL)
        }
    }, [imageURI])

    return (
        <div>
            <div>
                {imageURIURl ? (
                    <div
                        className="bg-slate-900 rounded-lg cursor-pointer hover:scale-105 transition-transform transform duration-300"
                    >
                        <div className="flex flex-col items-center p-4">
                            <div className={`${fredoka.className} text-slate-100`}>#{tokenId}</div>
                            <Image
                                loader={() => imageURIURl}
                                src={imageURIURl}
                                height="250"
                                width="250"
                                key={tokenId}
                                alt="NFT Image"
                                className={`h-${height} w-${width}`}
                            />
                            <div className={`mt-2 text-slate-100 ${fredoka.className}`}>
                                Type: {petType}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    )
}