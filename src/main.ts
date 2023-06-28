import { shell } from "@tauri-apps/api";

import GuessingGame from "./guessing_game";
import reset from "./reset_browser";


reset();

// This code processes most of the game
const guess_input = document.querySelector<HTMLInputElement>(".guess");
guess_input?.addEventListener("keydown", async (event) => {
    // Setting up default values
    if (event.key !== 'Enter') return;

    // Processing the input
    let [mainMessage, errorMessage] = await GuessingGame.gameLogic(guess_input.value)

    // Updating the changes
    guess_input.value = "";
    GuessingGame.updateMessage(mainMessage, '.main-msg');
    GuessingGame.updateMessage(errorMessage, '.error-msg');
});

// It makes the #link open the link in the browser
document.querySelector("#link")?.addEventListener("click", () => {
    shell.open("https://github.com/NyshimoriMizuki").then();
})