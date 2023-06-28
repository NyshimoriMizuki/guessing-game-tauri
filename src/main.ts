// import { invoke } from "@tauri-apps/api/tauri";
import { shell } from "@tauri-apps/api";

/** This function changes the text of on `Element`*/
function updateMessage(message: string, targetId: string) {
    const errorMessage = document.getElementById(targetId)
    if (errorMessage) errorMessage.textContent = message;
}

// This code processes most of the game
const guess_input = document.querySelector("#guess") as HTMLInputElement;
guess_input.addEventListener("keydown", (event) => {
    // Setting up default values
    if (event.key !== 'Enter') return;
    var mainMessage = "Try to guess my secret number.";
    var errorMessage = "";

    // Processing the input
    if (guess_input.value === "42") mainMessage = "42";
    else if (guess_input.value === "66") errorMessage = "devil";
    else console.log(guess_input.value)

    // Updating the changes
    guess_input.value = "";
    updateMessage(mainMessage, 'main-msg');
    updateMessage(errorMessage, 'error-msg');
});

// It makes the #link open the link in the browser
document.querySelector("#link")?.addEventListener("click", () => {
    shell.open("https://github.com/NyshimoriMizuki").then();
})