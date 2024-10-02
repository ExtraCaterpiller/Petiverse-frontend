import { InfinitySpin } from "react-loader-spinner";

export default function Loader() {
    return (
        <div className="flex justify-center items-center h-screen">
            <InfinitySpin
                color="#fff"
                height={100}
                visible={true}
                ariaLabel="Loading..."
            />
        </div>
    )
}