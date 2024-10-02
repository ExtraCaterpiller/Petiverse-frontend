export async function generateMetadata({ params, searchParams }, parent) {
    const id = params.tokenId

    return {
        title: `Train NFT #${id}`,
    }
}

export default function TrainLayout({ children }) {
    return <section>{children}</section>
}