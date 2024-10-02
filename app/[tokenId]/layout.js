

export async function generateMetadata({ params, searchParams }, parent) {
    const id = params.tokenId

    return {
        title: `Token #${id}`,
    }
}

export default function TokenLayout({ children }) {
    return <section>{children}</section>
}