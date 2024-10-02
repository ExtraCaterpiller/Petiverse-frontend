import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, kaia, kairos } from 'wagmi/chains';
import { KAIA_TESTNET_RPC_URL, KAIA_MAINNET_RPC_URL } from "@/constants/Contract";

export const config = createConfig({
    appName: 'PETIVERSE',
    projectId: 'Pet_NFT_APP',
    chains: [mainnet, sepolia, kaia, kairos],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
        [kaia.id]: http(KAIA_MAINNET_RPC_URL),
        [kairos.id]: http(KAIA_TESTNET_RPC_URL),
    },
})