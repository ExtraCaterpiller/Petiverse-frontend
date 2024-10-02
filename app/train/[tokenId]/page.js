'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { nftAbi } from "@/constants/NftAbi";
import { NFT_ADDRESS } from "@/constants/Contract";
import { Rubik, Nunito } from "next/font/google";
import { toast } from "react-toastify";
import { Router } from 'next/router';

const rubik = Rubik({
    weight: ["400"],
    subsets: ["latin"],
})

const nunito = Nunito({
    weight: ["400"],
    subsets: ["latin"],
})

export default function Train() {
    const { data: hash, isPending, writeContract } = useWriteContract()
    const searchParams = useParams()
    const router = useRouter()
    const tokenId = searchParams.tokenId
    const [targetWord, setTargetWord] = useState("");
    const [chances, setChances] = useState(0);
    const [selectedPoints, setSelectedPoints] = useState([]);
    const [loading, setLoading] = useState(false);
    const [words, setWords] = useState({});
    const [upgradeType, setUpgradeType] = useState("");

    const { address, isConnected } = useAccount()
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

    const maxAttempts = 3;
    const grid = Array.from({ length: 25 }, (_, i) => i);

    useEffect(() => {
        const fetchGameData = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/nft/gamedata/${tokenId}`);
            const data = await response.json();
            console.log("gamedata: ", data)
            if (!data.success) {
                toast.error(data.message)
                setTargetWord("-----")
                setChances(0)
                return
            }
            setTargetWord(data.targetWord);
            setChances(data.chances)
        };

        fetchGameData();
    }, [tokenId]);

    const handleSelectPoint = (point) => {
        if (selectedPoints.length < 5 && !selectedPoints.includes(point)) {
            setSelectedPoints([...selectedPoints, point]);
        } else if (selectedPoints.includes(point)) {
            setSelectedPoints(selectedPoints.filter((p) => p !== point));
        }
    }

    const handleSubmit = async () => {
        if (upgradeType === "") {
            toast.error("Please select an upgrade type before submitting")
            return
        }

        setLoading(true);
        if (selectedPoints.length === 5) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/nft/checkwordle/${tokenId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nums: selectedPoints.join(","),
                        targetWord,
                        userAddress: address,
                        tokenId
                    }),
                });

                const data = await response.json();

                if (!data.success) {
                    toast.error(data.message)
                    return
                }

                if (data.found && data.signature) {
                    toast.success(`Congratulations! You guessed the word right`);
                    handleContractSubmit(data.signature);
                    router.push(`/${tokenId}`)
                } else {
                    toast.error(`Try again! You formed: ${data.word}`);
                }

                setWords(prevWords => {
                    const updatedWords = { ...prevWords }
                    for (let i = 0; i < selectedPoints.length; i++) {
                        updatedWords[selectedPoints[i]] = data.word[i]
                    }
                    return updatedWords;
                })
                setChances(chances - 1);
                setSelectedPoints([]);
            } catch (error) {
                toast.error("Something went wrong. Error: " + error.message);
            }
        } else {
            toast.info("Please select 5 points before submitting.");
        }
        setLoading(false);
    };

    const handleContractSubmit = async (signature) => {
        if (!isConnected) {
            toast.error('Please connect your wallet')
            return
        }

        writeContract({
            address: NFT_ADDRESS,
            abi: nftAbi,
            functionName: 'updatePetStat',
            args: [BigInt(tokenId), Number(upgradeType), String(signature)],
        })
    }

    return (
        <div className='h-screen'>
            <div className={`text-center text-slate-100 ${rubik.className}`}>
                <h2 className={`font-bold text-2xl`}>Wordle Game - Train Your Pet</h2>
                <p>Attempts: {chances}/{maxAttempts}</p>
                <h2>Target Word: {targetWord}</h2>
            </div>

            {/* Display grid of 25 points */}
            <div className='backdrop-blur-md w-4/12 h-96 mx-auto rounded-lg shadow-md flex justify-center items-cente'>
                <div className={`w-96 mx-auto grid grid-cols-5 gap-2 mt-4 ${nunito.className} text-slate-200`}>
                    {grid.map((point) => (
                        <div
                            key={point}
                            className={`m-2 h-12 w-12 border flex justify-center cursor-pointer items-center rounded-lg transition ease-in-out ${selectedPoints.includes(point) ? 'border-neutral-100' : 'border-neutral-500'} hover:border-neutral-50 transition-transform transform hover:scale-110`}
                            onClick={() => handleSelectPoint(point)}
                        >
                            {words[point] !== undefined ? words[point] : point + 1}
                        </div>
                    ))}
                </div>
            </div>

            {/* Show current selection */}
            <div className={`mt-4 text-center ${rubik.className}`}>
                <h3 className='mb-4 text-neutral-100'>Selected Points:</h3>
                {selectedPoints.map((point) => (
                    <span key={point} className="mr-2 p-2 text-neutral-200 border border-neutral-100 rounded-lg">{point + 1}</span>
                ))}
            </div>

            <label className={`${rubik.className} flex flex-col text-slate-200 items-center my-3`}>
                Select Upgrade Type:
                <div className={`p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500`}>

                    <select onChange={(e) => setUpgradeType(e.target.value)} className={`${nunito.className} h-10 w-96 text-slate-950 text-center bg-white border-none focus:outline-none`} name="upgradeType" required>
                        <option value="" key="">Select Upgrade</option>
                        <option value="0" key="1">Agility</option>
                        <option value="1" key="2">Strength</option>
                        <option value="2" key="3">Intelligence</option>
                    </select>
                </div>
            </label>

            {/* Submit button */}
            <div className='flex flex-col items-center mt-2'>
                <button
                    className={`${nunito.className} mt-4 px-4 py-2 text-red-700 text-xl border border-red-700 hover:text-slate-100 relative group overflow-hidden`}
                    onClick={handleSubmit}
                    disabled={chances <= 0 || loading || isPending || isConfirming}
                >
                    <span className="absolute inset-0 bg-red-700 transform -translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0"></span>
                    <span className="relative z-10">
                        Submit Wordle
                    </span>
                </button>
            </div>

            {/* Show message */}
            {hash && <div className={`${rubik.className} text-center font-bold text-xl text-slate-200 mt-28`}>Transaction Hash: {hash}</div>}
            {isConfirming && toast.info("Waiting for confirmation...")}
            {isConfirmed && toast.info("Transaction confirmed")}
        </div>
    )
}