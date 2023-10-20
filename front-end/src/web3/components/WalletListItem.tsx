import { FC, useMemo } from 'react';
import { WalletType } from '../../packages/src';
import { useStore } from '../../store';
import {useConnect} from 'wagmi';


export const WalletListItem: FC<{
  walletType: WalletType;
}> = ({ walletType }) => {
  const { connect } = useConnect();
  const activeWallet = useStore(store => store.activeWallet);
  const connectWallet = useStore((state) => state.connectWallet);
  const disconnectActiveWallet = useStore(
    (state) => state.disconnectActiveWallet,
  );

  const isActive = useMemo(() => {
    return activeWallet?.walletType == walletType;
  }, [walletType, activeWallet]);

  const handleWalletClick = async () => {
    if (isActive) {
      await disconnectActiveWallet();
    } else {
      await connectWallet(connect, walletType);
    }
  };

  return (
    <>
      <button onClick={handleWalletClick}>
        {isActive ? 'disconnect' : 'connect'}
        {walletType} {activeWallet?.chainId}
      </button>
      {/* {isActive && activeWallet?.wrongNetwork && (
        <button>
          {activeWallet?.wrongNetwork &&
            `Wrong network ${activeWallet.chainId}`}
        </button>
      )} */}
    </>
  );
};
