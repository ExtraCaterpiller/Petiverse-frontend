'use client'

import { useEffect, useState } from "react";
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import NFTCard from "@/components/NFTCard";
import { Rubik } from "next/font/google";
import Loader from "@/components/Loader";

const rubik = Rubik({
    weight: ["400"],
    subsets: ["latin"],
})

export default function Pets() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { address, isConnected } = useAccount()
    const router = useRouter()

    useEffect(() => {
        if (address && isConnected) {
            const fetchData = async () => {
                setLoading(true)
                let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/nft/${address}`)
                let data2 = await response.json()
                setData(data2)
                setLoading(false)
            }

            fetchData()
        }
    }, [address])

    if (!isConnected) {
        return <div className={`${rubik.className} text-center font-bold text-2xl text-slate-200 my-36 h-screen`}>Please connect your wallet</div>
    } else if (loading) {
        return <Loader />
    }

    return (
        <>
            {
                data.nfts.length > 0 ? (
                    <div className="grid grid-cols-4 gap-4 p-3 mt-5">
                        {data.nfts.map((nft) => (
                            <div onClick={() => router.push(`/${nft.tokenId}`)} >
                                <NFTCard tokenId={nft.tokenId} imageURI={nft.image} petType={nft.petType} key={nft.tokenId} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={`${rubik.className} text-center font-bold text-2xl text-slate-200 my-36 h-screen`}>
                        <h1>No NFTs Found</h1>
                        <h1>Please Mint <span className="text-red-500 cursor-pointer" onClick={() => router.push('/mint')}>Here</span></h1>
                    </div>
                )
            }
        </>

    )
}
