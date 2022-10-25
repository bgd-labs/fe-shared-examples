import { BigNumber } from "ethers";
import { StoreSlice } from "../../packages/src";
import { TransactionsSlice } from "../../transactions/store/transactionsSlice";
import { Web3Slice } from "../../web3/store/web3Slice";

export interface CounterSlice {
  counterLoading: boolean;
  counterValue?: BigNumber;
  increment: () => Promise<void>;
  decrement: () => Promise<void>;
  getCounterValue: () => Promise<void>;
}

export const createCounterSlice: StoreSlice<
  CounterSlice,
  Web3Slice & TransactionsSlice
> = (set, get) => ({
  increment: async () => {
    await get().executeTx({
      body: () => get().counterDataService.increment(),
      params: {
        type: "increment",
        payload: {},
      },
    });
  },
  decrement: async (chainId: number  = 3) => {
    const counterDataService = chainId == 3 ? get().counterDataService : get().anotherCounterDataService;
    await get().executeTx({
      body: () => counterDataService.decrement(),
      params: {
        type: "decrement",
        payload: {},
      },
    });
  },
  counterLoading: true,
  getCounterValue: async (chainId: number = 3) => {
    const counterDataService = chainId == 3 ? get().counterDataService : get().anotherCounterDataService;
    set({
      counterLoading: true,
    });
    const counterValue = await counterDataService.fetchCurrentNumber();
    set({
      counterValue,
      counterLoading: false,
    });
  },
});
