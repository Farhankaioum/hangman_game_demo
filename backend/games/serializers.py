from rest_framework import serializers


class GuessSerializer(serializers.Serializer):
    guess = serializers.CharField(required=True, allow_blank=False, max_length=1)

    def validate_guess(self, value):
        value = value.strip().lower()

        if len(value) != 1 or not value.isalpha() or not value.isascii():
            raise serializers.ValidationError("Guess must be a single English letter.")

        return value