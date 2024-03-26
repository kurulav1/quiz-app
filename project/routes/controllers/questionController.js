import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";
import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
    question_text: [validasaur.required,validasaur.isString],
}

const deleteQuestion = async({params,response}) => {
    const topic_id = params.tId;
    const question_id = params.qId;
    await questionService.deleteQuestion(question_id);
    response.redirect(`/topics/${topic_id}`);
}

const getQuestionData = async(request) => {
    const body = request.body({type:"form"})
    const params = await body.value;
    return {
        question_text: params.get("question_text"),
    }
}
const addQuestion = async({request,response,params,render}) => {
    const question_data = await getQuestionData(request);
    const topic_id = params.id;
    const [passes,errors] = await validasaur.validate(
        question_data,
        questionValidationRules
    )
    if (!passes) {
        question_data.validationErrors = errors;
        question_data.topic_id = topic_id;
        question_data.questions = await topicService.viewTopic(topic_id);
        render("questions.eta",question_data);
    } else {
        
    await questionService.addQuestion(
        1,
        topic_id,
        question_data.question_text,
    );
    response.redirect(`/topics/${topic_id}`);
    }
}

const listQuestions = async({params,response,render}) => {
    const topic_id = params.id;
    render("questions.eta",{questions: await questionService.listQuestions(topic_id)});
}


const getRandomQuestion = async({params,response}) => {
    const topic_id = params.tId;
    const all_questions = await questionService.listQuestions(topic_id);
    let question_id_list = all_questions.map(obj => obj.id);
    let random_id = question_id_list[Math.floor(Math.random() * question_id_list.length)];
   
    
    
    
    response.redirect(`/quiz/${topic_id}/questions/${random_id}`);

}


const viewQuestion = async({params,render}) => {
    const topic_id = params.id;
    const question_id = params.qId;
    const question_object = await questionService.getQuestion(question_id);
    
    const answerOptionObject = {
        question_text : question_object[0].question_text,
        topic_id : topic_id,
        question_id : question_id,
        answer_options : await questionService.viewQuestion(question_id)
    }
  
    render("answers.eta",answerOptionObject);
}



export {addQuestion,listQuestions, viewQuestion, getRandomQuestion, deleteQuestion}