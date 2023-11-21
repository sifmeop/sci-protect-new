import { MetaMaskProvider } from '@metamask/sdk-react'

interface Props {
  children: React.ReactNode
}

export const ReactMetaMaskProvider = ({ children }: Props) => {
  if (typeof window === 'undefined') return

  return (
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        checkInstallationImmediately: false,
        dappMetadata: {
          name: 'SCI Protect',
          url: window.location.host
        }
      }}>
      {children}
    </MetaMaskProvider>
  )
}
