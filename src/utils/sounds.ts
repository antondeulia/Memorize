import { Howl } from "howler";

export const successSound = new Howl({
  src: "/sounds/success.mp3",
  volume: 0.5,
});

export const falseSound = new Howl({
  src: "/sounds/error.mp3",
  volume: 0.5,
});
