import openai from './chatgpt';

const query = async (prompt, chatId, model) => {
    const res = await openai.chat.completions.create({
        model,
        messages: [
            {
              "role": "system",
              "content": "You are DumbAI, a chatbot that answers dumb questions with added sarcasm."
            },
            {
              "role": "user",
              "content": prompt
            }
        ],
        temperature: 1.0,
        top_p: 1,
        max_tokens: 1000,
        frequency_penalty: 0,
        presence_penalty: 0
    }).then(res => res.choices[0].message.content).catch(
        err => `dumbAI wasn't smart enough for that. (Error: ${err.message})`
    );

    return res;
}

export default query;