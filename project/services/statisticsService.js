import { sql } from "../database/database.js";

const getTopicAmount = async () => {
    const rows = await sql`SELECT * FROM topics`;
    return rows.length;
}

const getQuestionAmount = async() => {
    const rows = await sql`SELECT * FROM questions`;
    return rows.length;
}

const getAnswerAmount = async() => {
    const rows = await sql`SELECT * FROM question_answer_options`;
    return rows.length;
}

export {getAnswerAmount, getQuestionAmount, getTopicAmount};