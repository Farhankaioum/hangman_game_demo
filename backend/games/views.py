from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Game
from .serializers import GuessSerializer
from .services import create_game, game_state, process_guess


@api_view(["POST"])
def new_game(request):
    game = create_game()
    return Response({"id": game.id}, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def get_game(request, game_id):
    game = get_object_or_404(Game, pk=game_id)
    return Response(game_state(game))


@api_view(["POST"])
def guess(request, game_id):
    game = get_object_or_404(Game, pk=game_id)

    serializer = GuessSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    is_correct, state = process_guess(game, serializer.validated_data["guess"])

    return Response(
        {
            "correct": is_correct,
            **state,
        }
    )
