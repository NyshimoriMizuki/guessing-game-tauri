use rand::Rng;

#[tauri::command(rename_all = "snake_case")]
pub fn check_guess(guess: usize, secret_number: usize) -> String {
    match guess.cmp(&secret_number) {
        std::cmp::Ordering::Less => "wrong-lower".to_string(),
        std::cmp::Ordering::Equal => "winner".to_string(),
        std::cmp::Ordering::Greater => "wrong-higher".to_string(),
    }
}

#[tauri::command(rename_all = "snake_case")]
pub fn render_message(message_type: &str, number_or_guess: i32) -> String {
    match message_type {
        "winner" => String::from(
            r#"
        <p id="main-txt">🏆 You Won 🏆</p>
        <p id="sub-txt">That was my number!<p>
        "#,
        ),
        "loser" => format!(
            r#"
        <p id="main-txt">Sorry, you lose😟</p>
        <p id="sub-txt">My number was {number_or_guess}<p>.
        "#
        ),
        "wrong-higher" => format!(
            r#"<p id="main-txt">Your guess ( {number_or_guess} ) is higher than my number.<p>"#
        ),
        "wrong-lower" => format!(
            r#"<p id="main-txt">Your guess ( {number_or_guess} ) is lower than my number.<p>"#
        ),
        _ => String::from("Type a valid number"),
    }
}

#[tauri::command]
pub fn get_random_number() -> u32 {
    rand::thread_rng().gen_range(1, 101)
}
