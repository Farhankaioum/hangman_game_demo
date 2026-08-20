import { useGame } from './hooks/useGame';
import { Topbar } from './components/Topbar/Topbar';
import { GameCard } from './components/GameCard/GameCard';
import './App.css';

function App() {
  const {
    game,
    guess,
    message,
    loading,
    apiError,
    guessedLetters,
    createNewGame,
    refreshGame,
    handleGuess,
    handleInputChange,
    handleFormSubmit
  } = useGame();

  return (
    <div className="app">
      <Topbar
        gameId={game?.id}
        loading={loading}
        onRefresh={refreshGame}
        onCreateNew={createNewGame}
      />

      <div className="">
        <GameCard
          game={game}
          guess={guess}
          message={message}
          loading={loading}
          guessedLetters={guessedLetters}
          onInputChange={handleInputChange}
          onFormSubmit={handleFormSubmit}
          onGuess={handleGuess}
          onCreateNew={createNewGame}
          onRefresh={refreshGame}
        />

      </div>

      {apiError && (
        <div className="global-error">
          <strong>⚠ API Error</strong>
          <span>{apiError}</span>
        </div>
      )}
    </div>
  );
}

export default App;