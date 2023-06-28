import { invoke } from "@tauri-apps/api/tauri";


const SECRET_NUM = getRandomNumber();
const LIMIT = 10;
let tries = 0;

/** This function changes the text of on `Element`*/
function updateMessage(message: string, targetId: string) {
    const errorMessage = document.querySelector(targetId)
    if (errorMessage) errorMessage.innerHTML = message;
}

/** This function changes the text of on `Element`*/
function setState(element: string, state: boolean) {
    const input = document.querySelector<HTMLInputElement>(element);
    if (input) input.disabled = state;
}

/**
 * This function check if the number guessed is higher, lower or equal to `secretNumber`,  can throw a error message if something is wrong happened.
 * 
 * @param guess the number guessed by the user
 * @param secretNumber 
 * @
 */
async function checkGuess(guess: number, secretNumber: number): Promise<string> {
    return invoke('check_guess', { guess: guess, secret_number: secretNumber })
        .then(result => result as string)
        .catch(err => {
            console.log(err);
            throw "error in compering"
        });
}

/** This function uses the Rust function `guessing_game::get_random_number` to get a random number 
 * @returns a random number between 1 and 100
*/
async function getRandomNumber(): Promise<number> {
    return invoke('get_random_number')
        .then(num => {
            console.log(num);
            return num as number
        });

}

/** This function gets the `msgType` and render the corresponding message template.
 * 
 * @param msgType Type of the message to be printed. e.g.: `winner`, `wrong-lower`, ...
 * @param numOrGuess The secret number or the user's guess
 */
async function renderMessage(msgType: string, numOrGuess: number): Promise<string> {
    return invoke('render_message', { message_type: msgType, number_or_guess: numOrGuess })
        .then(result => result as string);

}

/** This function processes the user's input and give the answer of if player won, lose, typed an invalid entry , etc.
 * 
 * @param guess The raw user's guess in string form.
 * @returns Return a 2 strings, the first with message and the second with an error message or none.
 */
async function gameLogic(guess: string): Promise<[string, string]> {
    let secretNum = await SECRET_NUM;
    let message = "Try to guess my secret number.";
    let error = "";

    if (guess) {
        try {
            let guess_num = parseInt(guess);
            if (Number.isNaN(guess_num)) throw "Type a number";
            else if (guess_num > 100 || guess_num < 0) throw "Type a number between 1 and 100"

            let msgType = await checkGuess(guess_num, secretNum);

            if (msgType === "winner" || tries >= LIMIT) {
                message = await renderMessage(msgType === "winner" ? 'winner' : 'loser', secretNum);
                setState(".guess", true);
                setState("#restart-btn", false);
                setState("#exit-btn", false);
            }
            else message = await renderMessage(msgType, guess_num);
            tries++;
        } catch (e) {
            error = e as string;
        }
    }
    return [message, error]
}

export default { gameLogic, updateMessage };