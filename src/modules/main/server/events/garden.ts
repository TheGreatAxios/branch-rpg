import { RpgEvent, EventData, RpgPlayer } from "@rpgjs/server";

@EventData({
  name: "garden",
  hitbox: {
    width: 128,
    height: 64,
  },
})
export class GardenEvent extends RpgEvent {
  async onAction(player: RpgPlayer) {
    const choice = await player.showChoices(
      "Do you want to water the garden?",
      [
        { text: "Water the garden!", value: true },
        { text: "I'll water it later.", value: false },
      ]
    );

    if (choice?.value) {
      player.emit("task", { action: "garden" });
      player.showNotification("Watering the garden!!");
    }
  }
}
