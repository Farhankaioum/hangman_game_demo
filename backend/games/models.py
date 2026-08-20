from django.db import models


class Game(models.Model):
    class Status(models.TextChoices):
        IN_PROGRESS = "InProgress", "In Progress"
        WON = "Won", "Won"
        LOST = "Lost", "Lost"

    word = models.CharField(max_length=100)

    guessed_letters = models.JSONField(default=list)

    incorrect_guesses = models.PositiveIntegerField(default=0)

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.IN_PROGRESS,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Game {self.pk} - {self.status}"