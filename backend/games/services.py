import random
import math

from .models import Game

WORDS = ["Hangman", "Python", "Audacix", "Bottle", "Pen"]


def create_game():
    return Game.objects.create(word=random.choice(WORDS).lower())


def maximum_incorrect_guesses(game: Game) -> int:
    return math.ceil(len(game.word) / 2)


def calculate_status(game: Game) -> str:
    word_letters = set(game.word)
    guessed_letters = set(game.guessed_letters)

    if word_letters.issubset(guessed_letters):
        return Game.Status.WON

    if game.incorrect_guesses >= maximum_incorrect_guesses(game):
        return Game.Status.LOST

    return Game.Status.IN_PROGRESS


def display_word(game: Game) -> str:
    guessed = set(game.guessed_letters)
    return "".join(char if char in guessed else "_" for char in game.word)


def game_state(game: Game) -> dict:
    remaining = max(maximum_incorrect_guesses(game) - game.incorrect_guesses, 0)

    return {
        "id": game.id,
        "state": game.status,
        "word": display_word(game),
        "incorrect_guesses": game.incorrect_guesses,
        "incorrect_guesses_remaining": remaining,
    }


def process_guess(game: Game, guess: str) -> tuple[bool, dict]:
    if game.status != Game.Status.IN_PROGRESS:
        return False, game_state(game)

    guess = guess.lower()
    already_guessed = guess in game.guessed_letters

    if already_guessed:
        return guess in game.word, game_state(game)

    game.guessed_letters.append(guess)

    is_correct = guess in game.word

    if not is_correct:
        game.incorrect_guesses += 1

    game.status = calculate_status(game)
    game.save(update_fields=[
        "guessed_letters",
        "incorrect_guesses",
        "status",
        "updated_at",
    ])

    return is_correct, game_state(game)
