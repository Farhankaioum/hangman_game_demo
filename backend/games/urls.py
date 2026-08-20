from django.urls import path

from .views import get_game, guess, new_game

urlpatterns = [
    path("game/new", new_game, name="new-game"),
    path("game/<int:game_id>", get_game, name="game-state"),
    path("game/<int:game_id>/guess", guess, name="game-guess"),
]