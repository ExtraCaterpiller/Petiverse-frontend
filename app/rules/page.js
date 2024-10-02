import { Rubik, Nunito } from "next/font/google";

const rubik = Rubik({
    weight: ["400"],
    subsets: ["latin"],
})

const nunito = Nunito({
    weight: ["400"],
    subsets: ["latin"],
})

export default function Rules() {
    return (
        <div className={`${nunito.className} text-slate-100 ml-8 mt-4 text-center mb-8`}>
            <div className={`text-center`}>
                <h1 className="text-2xl font-bold">Welcome to Petiverse!</h1>
                <p>Here’s everything you need to know to play, from minting your pet to keeping them happy and healthy</p>
                <p>This guide will help you maximize your pet's potential and enjoy your experience!</p>
            </div>
            <div>
                <div className="flex flex-row justify-center items-center">
                    <h1 className="mt-2 text-xl">1. Minting Your Pet </h1>
                    <img src="/stack.png" alt="" className="h-8 w-8 ml-2" />
                </div>

                <p>- When you mint your pet, you will receive a unique NFT that represents your pet.</p>
                <p>- Navigate to the Minting Page and Choose your desired pet type from the available options with a name</p>
                <p>- Each pet has certain traits (e.g. strength, intelligence) that affect battle</p>
            </div>
            <div>
                <div className="flex flex-row justify-center items-center">
                    <h1 className="mt-2 text-xl">2. Pet Stats</h1>
                    <img src="/stat.png" alt="" className="h-6 w-6 ml-2" />
                </div>
                <p>- Your pet has three key stats: Agility, Strength, and Intelligence</p>
                <p>- And three secondary stats: Health, Hydration and Happiness</p>
                <p>- Improve secondary stats above 50 to upgrade key stats</p>
                <p>- Feed your pet regularly and ensure they exercise to maintain good secondary stat</p>
                <p>- You can feed your pet once every hour and exercise once every 12 hour</p>
                <p>- Every time you feed, health will increase by 1, happiness by 1 and hydration by 2</p>
                <p>- Every exercise will increase pet's health and happiness by 5</p>
                <p>- If you miss feeding your pet for 3 hours, your pet's health, hydration and happiness will reduce by 1</p>
                <p>- If you miss your pet's exercise for 24 hours, your pet's health and happiness will reduce by 3</p>
                <p>- Maximum score of happiness, hydration and health is 100</p>
            </div>
            <div>
                <div className="flex flex-row justify-center items-center">
                    <h1 className="mt-2 text-xl">3. Upgrading Your Pet</h1>
                    <img src="/star.png" alt="" className="h-6 w-6 ml-2" />
                </div>

                <p>- When your pet's secondary stats are above 50, you can upgrade their key stats</p>
                <p>- Solve a wordle game to improve and select which key stat you want to upgrade and submit score</p>
                <p className="text-red-500">Note: This will cost gas</p>
            </div>
            <div className="flex flex-row justify-center items-center">
                <hr className="w-1/2" />
            </div>
            <div>
                <p className="mt-2">We hope you enjoy your journey in <span className="text-red-500">Petiverse</span>! Explore, bond with your pet and strive for greatness</p>
                <p>Remember to check back here for updates and new features!</p>
            </div>
            <br />
        </div>
    )
}