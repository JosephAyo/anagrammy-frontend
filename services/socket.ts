import { MutableRefObject, useEffect, useRef, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:5884';

interface IAnswerQuestion {
  gameId: string;
  questionId: string;
  word: string;
  anagram: string;
  has_anagram: boolean;
}

interface IWord {
  id: string;
  word: string;
  word_length: number;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
  deleted_at: Date;
}

interface IQuestion {
  id: string;
  game_id: string;
  word: IWord;
  word_id: string;
  level: number;
  answer?: string;
  is_answer_no_anagram?: boolean;
  is_correct?: boolean;
  points: number;
  asked_at: Date;
  answered_at?: Date;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
  deleted_at: Date;
}

interface IGame {
  id: string;
  player_id: string;
  total_levels: number;
  current_level: number;
  fail_count: number;
  correct_count: number;
  started_at?: Date;
  finished_at?: Date;
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
  deleted_at: Date;
  questions: IQuestion[];
}

interface INewQuestion {
  data: {
    question: IQuestion;
    game: IGame;
  };
}

interface INewQuestion {
  data: {
    question: IQuestion;
    game: IGame;
  };
}

interface IAnswerResponse {
  data: {
    game: IGame;
    answer: {
      anagram: string;
      code: number;
      data: {
        anagramWords: string[];
        verdict: 'correct' | 'incorrect';
      };
      has_anagram: boolean;
      title: string;
      word: string;
    };
  };
}

interface IGameInfo {
  data: {
    game: IGame;
    total_score: number;
  };
}

const useSocket = () => {
  const [question, setQuestion] = useState<IQuestion>(); // Sent and received messages
  const [game, setGame] = useState<IGame>(); // Sent and received messages
  const socketRef = useRef() as unknown as MutableRefObject<Socket>;
  const [shouldPlayAgain, setShouldPlayAgain] = useState(false);
  useEffect(() => {
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {});

    const existingPlayerId = localStorage.getItem('player_id');
    if (!existingPlayerId) {
      socketRef.current.emit('request_new_player');
    } else {
      socketRef.current.emit('request_existing_player', existingPlayerId);
    }

    socketRef.current.on('current_player', (data) => {
      localStorage.setItem('player_id', data.player_id);
      startGame();
    });

    // Listens for incoming messages
    socketRef.current.on('new_question', (newQuestion: INewQuestion) => {
      const { game: gameData, question: questionData } = newQuestion.data;
      setGame(gameData);
      setQuestion(questionData);
    });

    socketRef.current.on('answer_response', (answerResponse: IAnswerResponse) => {
      socketRef.current.emit('request_question', answerResponse.data.game.id);
    });

    socketRef.current.on('game_completed', (completedGame: IGameInfo) => {
      const { game } = completedGame.data;
      socketRef.current.emit('game_summary', {
        playerId: game.player_id,
        gameId: game.id
      });
    });

    socketRef.current.on('game_summary_response', (gameSummary: IGameInfo) => {
      const { game } = gameSummary.data;
      setGame(game);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.off('current_player');
      socketRef.current.off('new_question');
      socketRef.current.off('answer_response');
      socketRef.current.off('game_completed');
      socketRef.current.off('game_summary_response');
      socketRef.current.disconnect();
    };
  }, [shouldPlayAgain]);

  const getCurrentPlayer = () => {
    return localStorage.getItem('player_id');
  };

  const startGame = () => {
    socketRef.current.emit('start_game', getCurrentPlayer());
  };

  const answerQuestion = (payload: IAnswerQuestion) => {
    const { gameId, questionId, word, anagram, has_anagram } = payload;
    socketRef.current.emit('answer_question', {
      playerId: getCurrentPlayer(),
      gameId,
      questionId,
      word,
      anagram,
      has_anagram
    });
  };

  return { question, game, answerQuestion, shouldPlayAgain, setShouldPlayAgain };
};

export default useSocket;
