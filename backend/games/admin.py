from django.contrib import admin
from .models import Game

@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ("id", "word", "status", "incorrect_guesses", "created_at")
    search_fields = ("word",)
    list_filter = ("status",)
