import { RpgEvent, EventData, RpgPlayer } from "@rpgjs/server";

@EventData({
  name: "info",
  hitbox: {
    width: 64,
    height: 64,
  },
})
export class InfoEvent extends RpgEvent {
  async onAction(player: RpgPlayer) {
    await player.showText("This game has only two objectives...", {
      talkWith: this,
    });
    await player.showText("1. Fetch some water from the bucket.", {
      talkWith: this,
    });
    await player.showText("2. Water the garden patch.", {
      talkWith: this,
    });
    await player.showText(
      "The game will save your state automatically on the SKALE Chaos Testnet blockchain whenever you do either action.",
      {
        talkWith: this,
      }
    );
    await player.showText(
      "Everything is on-chain. But thanks to ✨SKALE✨ you will NEVER notice the blockchain at all.",
      {
        talkWith: this,
      }
    );
  }
}
