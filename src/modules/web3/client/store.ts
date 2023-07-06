import { Contract, Wallet, ethers } from "ethers";
import { reactive } from "vue";
import {
  abi,
  address,
} from "../../../../contracts/deployments/chaos/BranchRPG.json";

interface IStore {
  loading: boolean;
  score: string;
  transactions: any[];
  address: string;
  signer: Wallet;
  contract: Contract;
  init: (signer: Wallet, socket: any) => Promise<void>;
  reset: () => void;
}

interface ITaskData {
  action: "water" | "garden" | "execute";
}

const BranchRPGAddress = address;
const BranchRPGContract = new ethers.Contract(
  BranchRPGAddress,
  abi,
  new ethers.providers.JsonRpcProvider(process.env.NODE_RPC_URL)
);

const BranchRPCBurnFilter = BranchRPGContract.filters.Transfer(
  null,
  ethers.constants.AddressZero
);

const onScore = (store: IStore) => async () => {
  const score = await BranchRPGContract.score();
  store.score = ethers.utils.formatEther(score);
};

const onTask = (store: IStore) => async (data: ITaskData) => {
  switch (data.action) {
    case "water": {
      await store.contract.mint(store.address, ethers.constants.WeiPerEther);
      break;
    }

    case "garden": {
      await store.contract.burn(ethers.constants.WeiPerEther);
      break;
    }
  }
};

export const store = reactive<IStore>({
  loading: false,
  score: "0",
  transactions: [],
  address: ethers.constants.AddressZero,
  signer: Wallet.createRandom(),
  contract: new ethers.Contract(
    BranchRPGAddress,
    abi,
    new ethers.providers.JsonRpcProvider(process.env.NODE_RPC_URL)
  ),
  async init(signer, socket) {
    try {
      this.loading = true;
      this.address = signer.address;
      this.signer = signer;
      this.contract = new ethers.Contract(BranchRPGAddress, abi, signer);
      this.score = ethers.utils.formatEther(await this.contract.score());

      BranchRPGContract.on(BranchRPCBurnFilter, onScore(this));
      socket.on("task", onTask(this));
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
  reset() {
    this.loading = false;
    this.calls = [];
  },
});
