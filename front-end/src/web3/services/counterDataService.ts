import { providers } from "ethers";
import { COUNTER_ADDRESS } from "../../utils/constants";
import { Counter } from "../contracts/Counter";
import { Counter__factory } from "../contracts/factories/Counter__factory";

export class CounterDataService {
  private counterFactory: Counter;
  private counterConnectedFactory?: Counter;
  constructor(provider: providers.JsonRpcBatchProvider) {
    this.counterFactory = Counter__factory.connect(
      COUNTER_ADDRESS,
      provider
    );
  }

  public connectSigner(signer: providers.JsonRpcSigner) {
    this.counterConnectedFactory = this.counterFactory.connect(signer);
  }

  async fetchCurrentNumber() {
    return await this.counterFactory.getCurrentNumber();
  }

  async increment() {
    if (this.counterConnectedFactory) {
      return this.counterConnectedFactory.increment()
    } else {
      throw new Error('CONNECT YOUR SIGNERSSSSS')
    }
  }

  async decrement() {
    if (this.counterConnectedFactory) {
      return this.counterConnectedFactory.decrement();
    } else {
      throw new Error('CONNECT YOUR SIGNERSSSSS')
    }
  }
}
