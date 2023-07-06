import { RpgClient, RpgModule } from "@rpgjs/client";
import { Wallet, providers } from "ethers";
import { AnonymousPoW } from "@skaleproject/pow-ethers";
import { store } from "./store";
import score from "./gui/score.vue";
import wallet from "./gui/wallet.vue";

const CHAOS_RPC_URL: string = "https://staging-v3.skalenodes.com/v1/staging-fast-active-bellatrix" as const;
const anonymousPow = new AnonymousPoW({ rpcUrl: CHAOS_RPC_URL });


/** Store Mnemnoic */
const findOrCreateSigner = async () => {
  let signer = localStorage.getItem("signer");
  if (!signer) {
    const wallet = Wallet.createRandom();
    signer = wallet.mnemonic.phrase;
    localStorage.setItem("signer", signer);
    const tx = await anonymousPow.send({
      to: "0x1B2e7E6E66a6c202cdC0C31DF996b530af22CBee",
      data: "0x0c11dedd000000000000000000000000" + wallet.address.substring(2),
    });
    await tx.wait(1);
  }

  return Wallet.fromMnemonic(signer).connect(new providers.JsonRpcProvider(CHAOS_RPC_URL));
};

@RpgModule<RpgClient>({
  gui: [score, wallet],
  engine: {
    async onConnected(_engine, socket) {
      const signer = await findOrCreateSigner();
      await store.init(signer, socket);
      socket.emit("account", { address: signer.address });
    },
  },
})
export default class RpgClientModuleEngine {}
