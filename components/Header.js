'use client'

import { ConnectButton } from "@rainbow-me/rainbowkit"
import Link from "next/link"
import { useState } from "react"
import { Fredoka } from "next/font/google"
import { useRouter } from 'next/navigation'

const fredoka = Fredoka({
    weight: ["500", "700"],
    subsets: ["latin"]
})

export default function Header() {
    const [tokenId, setTokenId] = useState("")
    const router = useRouter()

    return (
        <nav className={`px-8 flex flex-row text-neutral-400 justify-between items-center header-font ${fredoka.className} backdrop-blur-sm bg-gradient-to-b from-slate-900`}>
            <Link href="/" className="flex flex-row items-center transition-transform transform hover:scale-110 hover:text-neutral-100">
                <img src="/paw.png" alt="Logo" height={75} width={50} />
                <div className=" font-bold text-3xl pl-0.5">Petiverse</div>
            </Link>
            <div className="flex flex-row items-center">
                <div>
                    <input
                        onChange={(e) => setTokenId(e.target.value)}
                        onKeyUp={(e) => e.key === "Enter" ? router.push(`/${tokenId}`) : null}
                        type="text"
                        placeholder="Search by tokenId"
                        className="border border-slate-500 text-slate-900 rounded-lg text-center mr-4 w-48 h-8 focus:outline-none"
                    />
                </div>
                <Link href="/pets">
                    <div className="mr-4 p-6 text-xl transition-transform transform hover:scale-110 hover:text-neutral-100">Pets</div>
                </Link>
                <Link href="/mint">
                    <div className="mr-4 p-6 text-xl transition-transform transform hover:scale-110 hover:text-neutral-100">Mint</div>
                </Link>
                <Link href="/battle">
                    <div className="mr-4 p-6 text-xl transition-transform transform hover:scale-110 hover:text-neutral-100">Battle</div>
                </Link>
                <Link href="/rules">
                    <div className="mr-10 p-6 text-xl transition-transform transform hover:scale-110 hover:text-neutral-100">Guide</div>
                </Link>
                <div className="hover:text-neutral-100">
                    <ConnectButton chainStatus="icon" accountStatus="avatar" />
                </div>
            </div>
        </nav>
    )
}