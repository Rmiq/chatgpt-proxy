const { Configuration, OpenAIApi } = require("openai");

export default async function handler(req, res) {
	const configuration = new Configuration({
		apiKey: req.query.apiKey,
	});
	const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: req.query.prompt,
    max_tokens: 1024,
    temperature: 0
  });

  console.log(completion.data);

  res.status(200).json(completion.data.choices[0].text);
}
