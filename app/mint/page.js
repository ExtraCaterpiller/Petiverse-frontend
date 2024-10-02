'use client'

import { useWriteContract, useWaitForTransactionReceipt, BaseError, useAccount } from "wagmi";
import { nftAbi } from "@/constants/NftAbi";
import { NFT_ADDRESS } from "@/constants/Contract";
import { toast } from "react-toastify";
import { Rubik, Nunito } from "next/font/google";

const rubik = Rubik({
    weight: ["400"],
    subsets: ["latin"],
})

const nunito = Nunito({
    weight: ["400"],
    subsets: ["latin"],
})

export default function Mint() {
    const { data: hash, isPending, writeContract, error } = useWriteContract()
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })
    const { isConnected } = useAccount()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isConnected) {
            toast.error("Please connect your wallet")
            return
        }

        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            petType: formData.get('petType')
        }

        if (!data.name || !data.petType) {
            toast.error("Please fill all the fields")
            return
        }

        writeContract({
            address: NFT_ADDRESS,
            abi: nftAbi,
            functionName: 'mintNft',
            args: [Number(data.petType), data.name],
        })
    }

    return (
        <div className="mt-6 h-screen">
            <div className="ml-4">
                <h1 className={`${rubik.className} font-bold text-slate-200 text-3xl mt-12`}>Mint your unique digital companion today and start your journey toward greatness</h1>
                <p className={`${rubik.className} font-bold text-slate-200 text-xl`}>Each pet in the Petiverse is unique, with its own stats like agility, strength and intelligence</p>
                <p className={`${rubik.className} font-bold text-slate-200 text-xl`}>Begin your epic adventure by minting a pet, making it an essential part of your collection and a trusted companion in every challenge ahead.</p>
                <p className={`${rubik.className} font-bold text-slate-200 text-xl`}>Name your pet, just like a real-world companion and let the journey unfold</p>
            </div>
            <form onSubmit={handleSubmit}>
                <label className={`${rubik.className} flex flex-col text-slate-200 items-center mt-8`}>
                    Name of your pet:
                    <div className="p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                        <input
                            required
                            className="h-10 w-96 text-slate-950 text-center bg-white border-none focus:outline-none"
                            type="text"
                            name="name"
                        />
                    </div>
                </label>
                <br />
                <label className={`${rubik.className} flex flex-col text-slate-200 items-center my-3`}>
                    Select Pet Type:
                    <div className={`p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500`}>
                        <select className={`${nunito.className} h-10 w-96 text-slate-950 text-center bg-white border-none focus:outline-none`} name="petType" required>
                            <option value="" disabled selected>
                                Select your Pet Type
                            </option>
                            <option value="0" key="0">CAT</option>
                            <option value="1" key="1">DOG</option>
                            <option value="2" key="2">DUCK</option>
                            <option value="3" key="3">DOVE</option>
                        </select>
                    </div>
                </label>

                <div className="flex flex-col items-center mt-8">
                    <button
                        className={`${nunito.className} w-48 h-10 text-red-700 text-xl border border-red-700 hover:text-slate-100 relative group overflow-hidden`}
                        disabled={isPending || isConfirming}
                        type="submit"
                    >
                        <span className="absolute inset-0 bg-red-700 transform -translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0"></span>
                        <span className="relative z-10">
                            {isPending || isConfirming ? 'Confirming...' : 'Mint'}
                        </span>
                    </button>
                </div>

                {hash && <div className={`${rubik.className} text-center font-bold text-xl text-slate-200 mt-28`}>Transaction Hash: {hash}</div>}
                {isConfirming && toast.info("Waiting for confirmation...")}
                {isConfirmed && toast.info("Transaction confirmed")}
                {(error && hash) && toast.error(error.shortMessage || error.message)}
            </form>
        </div>
    )
}