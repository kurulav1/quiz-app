import * as statisticsService from "../../services/statisticsService.js";

const showStatistics = async ({render}) => {
    const topicAmount = await statisticsService.getTopicAmount();
    const questionAmount = await statisticsService.getQuestionAmount();
    const answerAmount = await statisticsService.getAnswerAmount();
    const statistics = {
        topicAmount : topicAmount,
        questionAmount : questionAmount,
        answerAmount : answerAmount,
    }
    render("main.eta",statistics);
}

export { showStatistics };