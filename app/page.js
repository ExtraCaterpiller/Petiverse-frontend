import { Montserrat, Ubuntu } from "next/font/google"

const montserrat = Montserrat({
  weight: ["400"],
  subsets: ["latin"],
})

const ubuntu = Ubuntu({
  weight: ["400", "700"],
  subsets: ["latin"]
})

export default function Home() {
  return (
    <div className="pet-intro pl-5 pt-5 h-screen">
      <div className={`${ubuntu.className} text-transparent h-20 bg-clip-text bg-gradient-to-r from-white to-blue-400 font-bold text-5xl mt-20`}>
        <h1 >Pet Your NFT - Bringing Digital Companions to Life</h1>
      </div>
      <div className={`${montserrat.className} text-blue-50 font-bold text-xl`}>
        <p>Step into the <span className="text-red-500">Petiverse</span>, where your digital pets become more than just NFTs - they become companions</p>
        <p>Mint one-of-a-kind pet NFTs, customize their abilities, upgrade their stats, and immerse yourself in a dynamic ecosystem of interaction and growth</p>
        <p>Own, evolve and experience your pets like never before - only with <span className="text-red-500">Petiverse</span></p>
      </div>
    </div>
  )
}
