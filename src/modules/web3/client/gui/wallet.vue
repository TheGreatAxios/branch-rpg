<template>
  <div class="web3-wallet">
    <p>Account Information</p>
    <p>
      {{ "Implementation: " }}
      <a
        href="https://docs.ethers.org/v5/"
        target="_blank"
      >Wallet by ethers.js
    </a>
    </p>
    <p>
      {{ "Address: " }}
      <a
        :href="`https://staging-fast-active-bellatrix.explorer.staging-v3.skalenodes.com/address/${store.address}/transactions`"
        target="_blank"
        >{{ store.address }}</a
      >
    </p>
    <br />
    <p v-if="store.loading" style="text-align: center">
      Loading (open console for logs)...
      <br />
    </p>
    <button @click="copySigner">Copy Seed Phrase (Mnemonic - keep this secret!)</button>
    <br />
    <button @click="openRepo">Go to source code</button>
    <br />
    <p>Powered by <a href="https://skale.space">SKALE</a></p>
  </div>
</template>

<script>
import { store } from "../store";

export default {
  name: "web3-wallet",
  inject: ["rpgCurrentPlayer"],
  data() {
    return {
      store,
    };
  },
  mounted() {
    this.store = store;
  },
  methods: {
    copySigner() {
      navigator.clipboard.writeText(store.signer.address);
    },
    openRepo() {
      window.open("https://github.com/TheGreatAxios/branch-rpg");
    },
  },
};
</script>

<style scoped lang="scss">
.web3-wallet {
  width: 500px;
  max-height: fit-content;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 8px;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  margin: auto;
  padding: 8px;
  z-index: 70;
}

.web3-cta-btn {
  background-color: #1679ef;
}

.web3-wallet button {
  display: block;
  width: 100%;
  border-radius: 8px;
  padding: 8px;
  font-family: $window-font-family;
}

.web3-wallet a,
p {
  color: white;
  font-family: $window-font-family;
}
</style>
