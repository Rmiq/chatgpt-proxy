import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Home = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

  const [response, setResponse] = useState('');

  const onSubmit = async data => {
    try {
        const res = await fetch(`/api/prompt?apiKey=${data.apiKey}&prompt=${data.prompt}`);
        const json = await res.json();
        setResponse(json);
    }
    catch(err) {
      console.log(err)
      setResponse("Something went wrong!")
    }
  }

	return (
		<div className={styles.container}>
			<Head>
				<title>ChatGPT Proxy</title>
				<meta name="description" content="ChatGPT proxy" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Welcome to ChatGPT Proxy</h1>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<label>OpenAI API key *</label>
					<input id="apiKey" {...register("apiKey", { required: true })} />
          {errors.apiKey && <span>This field is required</span>}
					<label>Ask a question *</label>
					<textarea id="prompt" {...register("prompt", { required: true })} />
          {errors.prompt && <span>This field is required</span>}
					<input type="submit" value={"Submit"} />
				</form>
				<div className={styles.response}>
					<h3>Response:</h3>
					<textarea id="response" value={response}/>
				</div>
			</main>
		</div>
	);
};

export default Home;