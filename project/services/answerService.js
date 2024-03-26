import { sql } from "../database/database.js";


const addAnswerOption = async(question_id,option_text,is_correct) => {
    await sql`INSERT INTO question_answer_options (question_id,option_text,is_correct) VALUES (${question_id},${option_text},${is_correct})`;

}

const viewAnswerOptions = async(question_id) => {
    const rows =  await sql`SELECT * FROM question_answer_options WHERE question_id = ${question_id}`;
    return rows
}

const addAnswer = async(user_id,question_id,option_id) => {
    await sql`INSERT INTO question_answers (user_id,question_id,question_answer_option_id) VALUES (${user_id},${question_id},${option_id})`;
}

const checkCorrect = async(option_id) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE id = ${option_id} AND is_correct = TRUE`;
    return rows;
}

const getCorrectOption = async(question_id) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${question_id} AND is_correct = TRUE`;
    return rows;
}

const deleteAnswerOption = async(answer_option_id) => {
    await sql`DELETE FROM question_answers WHERE question_answer_option_id = ${answer_option_id}`;
    await sql`DELETE FROM question_answer_options WHERE id = ${answer_option_id}`;
}

export {addAnswerOption, viewAnswerOptions,addAnswer,checkCorrect,getCorrectOption, deleteAnswerOption};