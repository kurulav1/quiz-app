import { sql } from "../database/database.js";
import * as answerService from "./answerService.js";

const listAllQuestions = async() => {
    const rows = await sql`SELECT * FROM questions`;
    return rows;
}
const addQuestion = async(user_id,topic_id,question_text) => {
    console.log(user_id)
    console.log(topic_id)
    console.log(question_text)
    await sql`INSERT INTO questions (user_id,topic_id,question_text) VALUES (${user_id},${topic_id},${question_text})`;

}

const listQuestions = async(topic_id) => {
    const rows = await sql`SELECT * FROM questions WHERE topic_id = ${topic_id}`;
    return rows;
}

const getQuestion = async(question_id) => {
    const rows = await sql`SELECT * FROM questions WHERE id = ${question_id}`;
    return rows;
}

const viewQuestion = async(question_id) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${question_id}`;
    return rows;
}

const deleteQuestion = async(question_id) => {
    await sql`DELETE FROM question_answers WHERE question_id = ${question_id}`;
    await sql`DELETE FROM question_answer_options WHERE question_Id = ${question_id}`;
    await sql`DELETE FROM questions WHERE id = ${question_id}`;
}


export {addQuestion, listQuestions, viewQuestion, getQuestion, listAllQuestions, deleteQuestion};