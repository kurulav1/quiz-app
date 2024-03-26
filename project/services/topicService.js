import { sql } from "../database/database.js";
import * as questionService from "./questionService.js";
import * as answerService from "./answerService.js";

const addTopic = async (user_id,name) => {
    await sql`INSERT INTO topics
        (user_id, name) VALUES (${user_id},${name})`;
};


const listTopics = async () => {
    const rows = await sql`SELECT * FROM topics;`;


    return rows;
}

const viewTopic = async (topic_id) => {
    const rows = await sql`SELECT * FROM questions WHERE topic_id = ${topic_id}`;
    return rows;
}

const deleteQuestions = async(topic_id) => {
    const questions = await viewTopic(topic_id);
    console.log(questions)
    var id_list = questions.map(question => question.id);
    console.log(id_list)
    id_list.forEach(id => questionService.deleteQuestion(id))
}

const deleteTopic = async(topic_id) => {
    
    await deleteQuestions(topic_id);
    await sql`DELETE FROM topics WHERE id = ${topic_id}`;
}
export { addTopic , listTopics , viewTopic, deleteTopic};