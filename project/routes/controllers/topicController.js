import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
    name: [validasaur.required,validasaur.isString],
}

const getTopicData = async (request) => {
    const body = request.body({type:"form"})
    const params = await body.value;

    return {
        name: params.get("name"),
    }
}

const addTopic = async ({request,response,render,user}) => {
    

    const topic_data = await getTopicData(request);
    const [passes,errors] = await validasaur.validate(topic_data,topicValidationRules);

    if (!passes) {
        topic_data.validationErrors = errors;
        render("topics.eta",topic_data);
    } else {
    await topicService.addTopic(
        user.id,
        topic_data.name,
    );
    response.redirect("/topics");
    }
}

const listTopics = async( {render , user}) => {
   const renderObj = {
        topics: await topicService.listTopics(),
        admin: user.admin,
   }
   render("topics.eta", renderObj);
}

const viewQuiz = async ( {render}) => {
    render("quiz_topics.eta",{topics: await topicService.listTopics()});
}

const deleteTopic = async({params,response}) => {
    const topic_id = params.id;
    await topicService.deleteTopic(topic_id);
    response.redirect("/topics")
}


const viewTopic = async({params,render}) => {
    const topic_id = params.id;
    const questionObject = {
        questions: await topicService.viewTopic(topic_id),
        topic_id: topic_id,
    }
    render("questions.eta", questionObject);
}
export {addTopic, listTopics, deleteTopic, viewTopic, viewQuiz};