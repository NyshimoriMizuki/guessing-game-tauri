// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[allow(unused_imports)]
use tauri::Manager;

mod guessing_game;

const COMPILE_MODE: &str = "build";

fn main() {
    if COMPILE_MODE == "dev" {
        #[allow(unused_variables)]
        tauri::Builder::default()
            .setup(|app| {
                #[cfg(debug_assertions)] // only include this code on debug builds
                {
                    let window = app.get_window("main").unwrap();
                    window.open_devtools();
                    window.close_devtools();
                }
                Ok(())
            })
            .invoke_handler(tauri::generate_handler![
                guessing_game::check_guess,
                guessing_game::get_random_number,
                guessing_game::render_message
            ])
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
    } else {
        tauri::Builder::default()
            .invoke_handler(tauri::generate_handler![
                guessing_game::check_guess,
                guessing_game::get_random_number,
                guessing_game::render_message
            ])
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
    }
}
