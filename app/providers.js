'use client'

import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import '@rainbow-me/rainbowkit/styles.css';
import {
    RainbowKitProvider,
    getDefaultWallets,
    getDefaultConfig,
    darkTheme
} from "@rainbow-me/rainbowkit";
import { trustWallet, ledgerWallet } from "@rainbow-me/rainbowkit/wallets";
import { WagmiProvider, http } from 'wagmi'
import { kaia, kairos } from 'wagmi/chains';
import { KAIA_TESTNET_RPC_URL, KAIA_MAINNET_RPC_URL } from "@/constants/Contract";
import { ToastContainer, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

const { wallets } = getDefaultWallets()

const config = getDefaultConfig({
    appName: 'PETIVERSE',
    projectId: 'Pet_NFT_APP',
    wallets: [
        ...wallets,
        {
            groupName: "Other",
            wallets: [trustWallet, ledgerWallet],
        },
    ],
    chains: [kaia, kairos],
    transports: {
        [kaia.id]: http(KAIA_MAINNET_RPC_URL),
        [kairos.id]: http(KAIA_TESTNET_RPC_URL),
    },
    ssr: true,
})

const taostOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: true,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "dark",
    transition: Bounce
}

export default function Provider({ children }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={darkTheme(darkTheme({
                    accentColor: '#7b3fe4',
                    accentColorForeground: 'white',
                    borderRadius: 'small',
                    fontStack: 'system',
                    overlayBlur: 'small',
                }))}>
                    {children}
                    <ToastContainer {...taostOptions} />
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}