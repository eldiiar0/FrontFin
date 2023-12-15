import React from 'react';
import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import Chess from 'chess.js';
import YouTube from 'react-youtube';

function App() {
  const [game, setGame] = useState(new Chess());
  const [videoId, setVideoId] = useState(''); // State to store the video ID

  // Function to play a predefined video from a list
  const playPredefinedVideo = () => {
    // Replace videoId with your desired YouTube video ID from the list
    const predefinedVideoIds = ['1uYWYWPc9HU', '1uYWYWPc9HU', '1uYWYWPc9HU']; // Add your video IDs here
    const randomIndex = Math.floor(Math.random() * predefinedVideoIds.length);
    const selectedVideoId = predefinedVideoIds[randomIndex];
    setVideoId(selectedVideoId);
  };
  // perform modify function on game state
  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }
  // make computer move
  function makeRandomMove() {
    const possibleMoves = game.moves();
    // exit if the game is over
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) return;
    // select random move
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    // play random move
    safeGameMutate((game) => {
      game.move(possibleMoves[randomIndex]);
    });
  }
  // perform action when piece dropped by user
  function onDrop(sourceSquare, targetSquare) {
    // attempt move
    let move = null;
    safeGameMutate((game) => {
      move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      });
    });
    if (move !== null) {
      playPredefinedVideo();
    }
    // illegal move made
    if (move === null) return false;
    // valid move made, make computer move
    setTimeout(makeRandomMove, 200);
    return true;
  }

  return (
    <div>
      <Chessboard position={game.fen()} onPieceDrop={onDrop} />
      {videoId && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube Video"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}

export default App;