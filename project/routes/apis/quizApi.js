import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";
import * as topicService from "../../services/topicService.js";


const getRandomQuestion = async( {response} ) => {
    
    const all_questions = await questionService.listAllQuestions();
    const question_amount = all_questions.length;
    const question_id = Math.floor(Math.random() * (question_amount)) +1;
    const question = await questionService.getQuestion(question_id);
    const question_text = question[0].question_text;
    const answer_options = await answerService.viewAnswerOptions(question_id);
    const answer_options_api = []
    for (let i = 0; i < answer_options.length; i++) {
        const temp_object = {
            option_id : answer_options[i].id,
            option_text : answer_options[i].option_text,
        }
        answer_options_api.push(temp_object)
    }
    const quizObject = {
        questionId: question_id,
        questionText: question_text,
        answerOptions : answer_options_api,
    }

    response.body = quizObject;
}




const checkAnswer = async ( { request, response} ) => {
    const body = request.body({type:"json"});
    const document = await body.value;
    const question_id = document.questionId;
    const option_id = document.optionId;
    const check_correct = await answerService.checkCorrect(option_id);
    if (check_correct.length > 0) {
        response.body = {
            correct: true,
        }
    } else {
        response.body = {
            correct: false,
        }
    }

}






export { getRandomQuestion,checkAnswer }