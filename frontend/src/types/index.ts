export type GameStatus = "InProgress" | "Won" | "Lost";

export type GameState = {
    id: number;
    state: GameStatus;
    word: string;
    incorrect_guesses: number;
    incorrect_guesses_remaining: number;
};

export type GuessResponse = GameState & {
    correct: boolean;
};

export type ApiActivity = {
    method: string;
    endpoint: string;
    status: number | null;
    message: string;
};