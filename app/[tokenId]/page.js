'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import NFTCard from "@/components/NFTCard";
import { NFT_ADDRESS, OPENSEA_TESTNET_URL } from "@/constants/Contract";
import Loader from "@/components/Loader";
import { Rubik, Nunito } from "next/font/google";
import { quotes } from '@/constants/quotes';
import { toast } from 'react-toastify';
import Lottie from "lottie-react";
import food from "@/animations/food"
import exercise from "@/animations/exercise"

const rubik = Rubik({
    weight: ["400"],
    subsets: ["latin"],
})

const nunito = Nunito({
    weight: ["400"],
    subsets: ["latin"],
})

export default function TokenId() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [quote, setQuote] = useState(null);
    const [showFoodAnimation, setShowFoodAnimation] = useState(false)
    const [showExerciseAnimation, setShowExerciseAnimation] = useState(false)
    const router = useRouter()
    const searchParams = useParams()
    const tokenId = searchParams.tokenId

    useEffect(() => {
        if (tokenId) {
            const fetchData = async () => {
                setLoading(true)
                let response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/nft/token/${tokenId}`)
                let data2 = await response.json()
                setData(data2)

                const petQuotes = quotes[data2.nft?.petType]
                let quoteIndex = Math.floor(Math.random() * 20);
                setQuote(petQuotes[quoteIndex.toString()])
                setLoading(false)
            }

            fetchData()
        }
    }, [tokenId])

    if (loading) {
        return <Loader />
    }

    const handleOpenSeaClick = () => {
        const openSeaURL = `${OPENSEA_TESTNET_URL}/baobab/${NFT_ADDRESS}/${tokenId}`;
        window.open(openSeaURL, '_blank');
    }

    const handleFood = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/nft/feed/${tokenId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: tokenId
            })
        })
        let fooddata = await res.json();

        fooddata.success && setShowFoodAnimation(true);

        if (!fooddata.success) {
            toast.error(fooddata.message)
        }
        if (fooddata.nft) {
            setData(fooddata);
        }

        setTimeout(() => {
            setShowFoodAnimation(false)
        }, 3000)
    }

    const handleExercise = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/nft/exercise/${tokenId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: tokenId
            })
        })
        let exercisedata = await res.json();
        exercisedata.success && setShowExerciseAnimation(true)

        if (!exercisedata.success) {
            toast.error(exercisedata.message)
        }

        if (exercisedata.nft) {
            setData(exercisedata)
        }

        setTimeout(() => {
            setShowExerciseAnimation(false)
        }, 3000)
    }

    const nft = data?.nft || {}

    return (
        <div className='relative'>
            <div className='z-50 absolute inset-0 top-0 left-0 flex justify-center items-center'>
                {showExerciseAnimation && <Lottie animationData={exercise} loop={true} />}
            </div>
            <div className='h-screen absolute z-10'>
                <div className={`${rubik.className} ml-4 mb-3`}>
                    <h1 className={`font-bold text-slate-200 text-3xl mt-8`}>Track your NFT pet's key stats like Health, Happiness, Agility, Strength and Intelligence Here</h1>
                    <p className={`font-bold text-slate-200 text-md`}>Improve these stats by engaging in daily challenges and activities</p>
                    <p className={`font-bold text-slate-200 text-md`}>A balanced pet will level up, unlocking new features and boosting its performance in competitions</p>
                    <p className={`font-bold text-slate-200 text-md`}>Regularly check and upgrade your pet to keep it happy, healthy and competitive in the Petiverse!</p>
                    <p className={`font-bold text-slate-200 text-md`}>Keep your pet's health, hydration and happiness above 50 to upgrade level, agility, strength and intelligence</p>
                </div>
                <div className='grid grid-cols-3 gap-2'>

                    <div className='flex flex-col justify-center items-center'>
                        <h1 className={`${rubik.className} text-center text-slate-100`}>Feed you pet every 6 hours and exercise every 12 hours to keep it happy, healthy and fit</h1>
                        <button
                            className={`${nunito.className} mt-4 px-4 py-2 text-red-700 text-xl border border-red-700 hover:text-slate-100 relative group overflow-hidden`}
                            onClick={handleFood}
                        >
                            <span className="absolute inset-0 bg-red-700 transform -translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0"></span>
                            <span className="relative z-10">
                                Feed
                            </span>
                        </button>
                        <button
                            className={`${nunito.className} mt-4 px-4 py-2 text-red-700 text-xl border border-red-700 hover:text-slate-100 relative group overflow-hidden`}
                            onClick={handleExercise}
                        >
                            <span className="absolute inset-0 bg-red-700 transform -translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0"></span>
                            <span className="relative z-10">
                                Exercise
                            </span>
                        </button>
                    </div>
                    <div className='mx-auto relative'>
                        <div className='h-96 w-96 z-50 absolute top-0 left-0 flex justify-center items-center'>
                            {showFoodAnimation && <Lottie animationData={food} loop={false} />}
                        </div>
                        <NFTCard tokenId={nft.tokenId} imageURI={nft.image} petType={nft.petType} name={nft.name} key={nft.tokenId} height={72} width={56} />
                    </div>
                    <div className='text-left mt-8 ml-16'>
                        <div className='flex flex-row items-center'>
                            <h2 className={`${rubik.className} font-bold text-2xl text-slate-100 mr-1`}>Pet Stat </h2>
                            <img src="/stat.png" alt="Stat" className='h-6 w-6' />
                        </div>
                        <div className={`${rubik.className} flex flex-col mt-6 text-slate-200`}>
                            <div>Token ID: {nft.tokenId}</div>
                            <div>Name: {nft.petName}</div>
                            <div>Type: {nft.petType}</div>
                            <br />
                            <div>Level: {nft.level}</div>
                            <div>Agility: {nft.agility}</div>
                            <div>Strength: {nft.strength}</div>
                            <div>Intelligence: {nft.intelligence}</div>
                            <br />
                            <div>Health: {nft.health}</div>
                            <div>Hydration: {nft.hydration}</div>
                            <div>Happiness: {nft.happiness}</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-center mt-2'>
                    <img src="/quotef.png" alt="Quote-icon" className='h-4 w-4 mr-2' />
                    <h1 className={`${rubik.className} text-slate-100`}>{quote}</h1>
                    <img src="/quoteb.png" alt="Quote-icon" className='ml-2 h-4 w-4' />
                </div>
                <div className='flex flex-col items-center'>
                    <button
                        className={`${nunito.className} mt-4 px-4 py-2 text-red-700 text-xl border border-red-700 hover:text-slate-100 relative group overflow-hidden`}
                        onClick={() => router.push(`/train/${tokenId}`)}
                    >
                        <span className="absolute inset-0 bg-red-700 transform -translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0"></span>
                        <span className="relative z-10">
                            Train Your Pet
                        </span>
                    </button>
                    <button
                        className={`${nunito.className} mt-4 px-4 py-2 text-red-700 text-xl border border-red-700 hover:text-slate-100 relative group overflow-hidden mb-6`}
                        onClick={handleOpenSeaClick}
                    >
                        <span className="absolute inset-0 bg-red-700 transform -translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0"></span>
                        <span className="relative z-10">
                            Sell or View on Opensea
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}