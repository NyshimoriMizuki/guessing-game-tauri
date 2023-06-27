// import { invoke } from "@tauri-apps/api/tauri";
import { shell } from "@tauri-apps/api";


document.querySelector(".link")?.addEventListener("click", () => {
    shell.open("https://github.com/NyshimoriMizuki").then();
})

document.querySelector(".button")?.addEventListener("click", () => {
    const target = document.querySelector(".button-target");
    if (target) target.textContent = "sas";
});

