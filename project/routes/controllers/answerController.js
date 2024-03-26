import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";
import { validasaur } from "../../deps.js";


const asnwerValidationRules = {
    option_text: [validasaur.required,validasaur.isString],
}



const addQuestion = async({request,response,params}) => {
    const body = request.body({type:"form"});
    const params_body = await body.value;
    const topic_id = params.id;
    await questionService.addQuestion(
        1,
        topic_id,
        params_body.get("question_text"),
    );
    response.redirect(`/topics/${topic_id}`);
}

const deleteAnswerOption = async({params,response}) => {
    const option_id = params.oId;
    const topic_id = params.tId;
    const question_id = params.qId;
    await answerService.deleteAnswerOption(option_id);
    response.redirect(`/topics/${topic_id}/questions/${question_id}`);
}

const getQuestionData = async(request) => {
    const body = request.body({type:"form"})
    const params = await body.value;
    return {
        question_text: params.get("question_text"),
    }
}

const getAnswerOptionData = async(request) => {
    const body = request.body({type:"form"});
    const params = await body.value;
    return {
        option_text: params.get("option_text"),
        is_correct : params.get("is_correct")
    }
}

const listQuestions = async({params,response,render}) => {
    const topic_id = params.get("id");
    render("questions.eta",{questions: await questionService.listQuestions(topic_id)});
}

const addAnswerOption  = async({request,params,response,render}) => {
    const option_data = await getAnswerOptionData(request);
    const topic_id = params.id;
    const question_id = params.qId;
    const option_text = option_data.option_text;
    const is_correct_input = option_data.is_correct;
    const question_data = await questionService.getQuestion(question_id)
    const question_text  = question_data[0].question_text;
    const [passes,errors] = await validasaur.validate(
        option_data,
        asnwerValidationRules
    )
    if (!passes) {
        option_data.validationErrors = errors;
        option_data.topic_id = topic_id;
        option_data.question_id = params.qId;
        option_data.question_text = question_text;
        option_data.answer_options = await answerService.viewAnswerOptions(question_id);
        render("answers.eta",option_data);
    } else {
    var is_correct = false;
    if(is_correct_input === "on") {
        is_correct = true;
    }
    
    await answerService.addAnswerOption(question_id,option_text,is_correct);
    response.redirect(`/topics/${topic_id}/questions/${question_id}`)
}
}

const listAnswerOptions = async({params,render})  => {
    const question_id = params.qId;
    const topic_id = params.tId;
    const answer_options = await answerService.viewAnswerOptions(question_id);
    const question_object = await questionService.getQuestion(question_id);
    const question_text = question_object[0].question_text;
    const quizObject = {
        question_text : question_text,
        topic_id : topic_id,
        question_id : question_id,
        answer_options : answer_options,
    }

    render("quiz.eta",{quizObject: quizObject});
    
}

const checkCorrect = async({params,response,user}) => {
    
    const question_id = params.qId;
    console.log("hello")
    const topic_id = params.tId;
    const answer_option_id = params.oId;
    answerService.addAnswer(user.id,question_id,answer_option_id);
    const check_correct = await answerService.checkCorrect(answer_option_id);
    console.log(answer_option_id)
    
    if (check_correct.length > 0) {
        response.redirect(`/quiz/${topic_id}/questions/${question_id}/correct`);
    } else {
        response.redirect(`/quiz/${topic_id}/questions/${question_id}/incorrect`);
    }

}

const correct = async({params,render}) => {
    const topic_id = params.tId;
    const correct_object = {
        topic_id : topic_id,
    }
    render("correct.eta",{correctObject: correct_object})
}

const incorrect = async({params,render}) => {
    const topic_id = params.tId;
    const correct_option = await answerService.getCorrectOption(params.qId);
    const correct_text = correct_option[0].option_text;
    const incorrect_object = {
        topic_id : topic_id,
        correct_text: correct_text,
    }
    render("incorrect.eta",{incorrectObject: incorrect_object})
}

export {addQuestion,listQuestions,addAnswerOption,listAnswerOptions,correct,incorrect,checkCorrect,deleteAnswerOption};