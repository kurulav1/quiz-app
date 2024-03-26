import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as answerController from "./controllers/answerController.js";
import * as userController from "./controllers/userController.js";
import * as loginController from "./controllers/loginController.js";
import * as statisticsController from "./controllers/statisticsController.js";

import * as quizApi from "./apis/quizApi.js";

const router = new Router();

router.get("/", statisticsController.showStatistics);
router.post("/topics", topicController.addTopic);
router.get("/topics",topicController.listTopics);
router.post("/topics/:id/delete",topicController.deleteTopic);
router.get("/topics/:id",topicController.viewTopic);
router.post("/topics/:id/questions",questionController.addQuestion);
router.get("/topics/:id/questions/:qId",questionController.viewQuestion)
router.post("/topics/:id/questions/:qId/options",answerController.addAnswerOption);
router.get("/auth/register",userController.showRegistrationForm);
router.post("/auth/register",userController.registerUser);
router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login",loginController.processLogin);
router.get("/quiz",topicController.viewQuiz);
router.get("/quiz/:tId",questionController.getRandomQuestion);
router.get("/quiz/:tId/questions/:qId",answerController.listAnswerOptions);
router.post("/quiz/:tId/questions/:qId/options/:oId",answerController.checkCorrect)
router.get("/quiz/:tId/questions/:qId/correct",answerController.correct);
router.get("/quiz/:tId/questions/:qId/incorrect",answerController.incorrect)
router.post("/topics/:tId/questions/:qId/delete",questionController.deleteQuestion);
router.get("/api/questions/random",quizApi.getRandomQuestion)
router.post("/api/questions/answer",quizApi.checkAnswer);
router.post("/topics/:tId/questions/:qId/options/:oId/delete",answerController.deleteAnswerOption)


export { router };
