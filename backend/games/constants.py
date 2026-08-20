WORDS = ["hangman", "python", "audacix", "bottle", "pen"]

class ErrorMessages:
    GAME_NOT_FOUND = "Game not found."
    GAME_ALREADY_OVER = "Game is already {status}. Please start a new game."
    INVALID_GUESS = "Guess must be a single English letter (A-Z or a-z)."
    GUESS_ALREADY_USED = "Letter '{letter}' has already been guessed."
    GAME_NOT_IN_PROGRESS = "Cannot make a guess. Game is not in progress."
    INVALID_GAME_ID = "Invalid game ID provided."

class SuccessMessages:
    GAME_CREATED = "Game created successfully."
    GAME_FETCHED = "Game state fetched successfully."
    GUESS_PROCESSED = "Guess processed successfully."

class LogMessages:
    GAME_CREATED = "Game {game_id} created with word: {word}"
    GAME_STATE_FETCHED = "Game {game_id} state fetched"
    GUESS_MADE = "Game {game_id}: User guessed '{guess}'. Correct: {correct}"
    GUESS_ERROR = "Error processing guess for game {game_id}: {error}"
    INVALID_ACCESS = "Invalid access attempt to game {game_id}"