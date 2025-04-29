"use client";

import {
  Typography,
  Container,
  Box,
  TextField,
  Button,
  Paper,
  LinearProgress,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import title from "./utils/constants";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<typeof title>([]);
  const [userAnswer, setUserAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const shuffled = [...title].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10));
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver && gameStarted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !gameOver && gameStarted) {
      handleNextQuestion();
    }
  }, [timeLeft, gameOver, gameStarted]);

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = questions[currentQuestion].answer.some(
      (ans) => ans.toLowerCase() === userAnswer.toLowerCase()
    );
    if (isCorrect) {
      setScore((prev) => prev + 1);
      handleNextQuestion();
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < 9) {
      setCurrentQuestion((prev) => prev + 1);
      setTimeLeft(15);
      setUserAnswer("");
      setShowError(false);
    } else {
      setGameOver(true);
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  if (questions.length === 0) {
    return (
      <Container maxWidth="md">
        <Box sx={{ my: 4, textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{ fontFamily: "Noto Sans JP, sans-serif" }}
          >
            読み込み中...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!gameStarted) {
    return (
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            my: 4,
            p: 6,
            textAlign: "center",
            background: "linear-gradient(45deg, #F44336 30%, #FF8A65 90%)",
            color: "white",
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: "Noto Sans JP, sans-serif",
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            名探偵コナン
            <br />
            タイトルクイズ
          </Typography>
          <Button
            variant="contained"
            onClick={startGame}
            sx={{
              mt: 6,
              backgroundColor: "white",
              color: "#F44336",
              fontSize: "1.5rem",
              padding: "16px 48px",
              fontFamily: "Noto Sans JP, sans-serif",
              fontWeight: 700,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#f5f5f5",
                transform: "scale(1.05)",
                transition: "transform 0.2s",
              },
            }}
          >
            START
          </Button>
        </Paper>
      </Container>
    );
  }

  if (gameOver) {
    return (
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            my: 4,
            p: 6,
            textAlign: "center",
            background: "linear-gradient(45deg, #F44336 30%, #FF8A65 90%)",
            color: "white",
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: "Noto Sans JP, sans-serif",
              fontWeight: 700,
            }}
          >
            クイズ終了！
          </Typography>
          <Typography
            variant="h3"
            sx={{
              mt: 6,
              fontFamily: "Noto Sans JP, sans-serif",
              fontWeight: 500,
            }}
          >
            正解数: {score}/10
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{
              mt: 6,
              backgroundColor: "white",
              color: "#F44336",
              fontSize: "1.2rem",
              padding: "12px 36px",
              fontFamily: "Noto Sans JP, sans-serif",
              fontWeight: 700,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#f5f5f5",
                transform: "scale(1.05)",
                transition: "transform 0.2s",
              },
            }}
          >
            もう一度プレイ
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          my: 4,
          p: 6,
          background: "linear-gradient(45deg, #F44336 30%, #FF8A65 90%)",
          color: "white",
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontFamily: "Noto Sans JP, sans-serif",
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          名探偵コナン タイトルクイズ
        </Typography>
        <Box sx={{ mt: 3 }}>
          <LinearProgress
            variant="determinate"
            value={(timeLeft / 15) * 100}
            sx={{
              height: 12,
              borderRadius: 6,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "white",
              },
            }}
          />
        </Box>
        <Typography
          variant="h5"
          sx={{
            mt: 3,
            fontFamily: "Noto Sans JP, sans-serif",
            fontWeight: 500,
          }}
        >
          問題 {currentQuestion + 1}/10
        </Typography>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Noto Sans JP, sans-serif",
              fontWeight: 500,
            }}
          >
            残り時間:
          </Typography>
          <Typography
            variant={timeLeft <= 5 ? "h1" : "h2"}
            sx={{
              mx: 1,
              fontFamily: "Noto Sans JP, sans-serif",
              fontWeight: 700,
              color: timeLeft <= 5 ? "#FFEB3B" : "white",
              textShadow:
                timeLeft <= 5 ? "0 0 10px rgba(255, 235, 59, 0.5)" : "none",
              transition: "all 0.3s ease",
            }}
          >
            {timeLeft}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Noto Sans JP, sans-serif",
              fontWeight: 500,
            }}
          >
            秒
          </Typography>
        </Box>
        <Card
          sx={{
            mt: 4,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: 4,
          }}
        >
          <CardContent>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Noto Sans JP, sans-serif",
                fontWeight: 700,
                textAlign: "center",
                mb: 4,
              }}
            >
              {questions[currentQuestion].question}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                fontStyle: "italic",
                opacity: 0.8,
                fontFamily: "Noto Sans JP, sans-serif",
                fontWeight: 400,
                textAlign: "center",
              }}
            >
              ヒント: {questions[currentQuestion].title}
            </Typography>
            <form onSubmit={handleAnswerSubmit}>
              <TextField
                fullWidth
                label="答えを入力"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                sx={{
                  mt: 4,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "white",
                    borderRadius: 2,
                    fontSize: "1.2rem",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: "1.2rem",
                  },
                }}
              />
              {showError && (
                <Alert
                  severity="error"
                  sx={{
                    mt: 2,
                    fontFamily: "Noto Sans JP, sans-serif",
                    fontSize: "1.1rem",
                  }}
                >
                  不正解です。
                </Alert>
              )}
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: "white",
                  color: "#F44336",
                  fontSize: "1.2rem",
                  padding: "12px 36px",
                  fontFamily: "Noto Sans JP, sans-serif",
                  fontWeight: 700,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    transform: "scale(1.05)",
                    transition: "transform 0.2s",
                  },
                }}
                disabled={!userAnswer}
              >
                回答
              </Button>
            </form>
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
}
