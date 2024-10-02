import { Ubuntu, Rubik } from "next/font/google";


const ubuntu = Ubuntu({
    weight: ["400", "700"],
    subsets: ["latin"]
})
export default function Page() {
    return (
        <div className={`${ubuntu.className} text-transparent h-20 bg-clip-text bg-gradient-to-r from-white to-blue-400 font-bold text-5xl py-48 h-screen`}>
            <h1 className="text-center">Coming Soon</h1>
        </div>
    )
}