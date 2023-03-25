import { Input, Button, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

function Search() {
  const [result, setResult] = useState();
  const processPrompts = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const data = {
      prompt: event.target.prompt.value,
    };

    const output = await openaiTextDavinci(data.prompt);
    console.log(JSON.stringify(output));
    return output;
  };
  async function openaiTextDavinci(prompt) {
    const apiKey = "NULL"; // Replace with your actual OpenAI API key
    const url =
      "https://api.openai.com/v1/engines/text-davinci-003/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    let complete =
      "Here are a series of ingredients, please make me a possible recipe. \n" +
      prompt.toString();

    console.log(typeof prompt);
    const data = JSON.stringify({
      prompt: complete,
      temperature: 0.7,
      max_tokens: 256,
      n: 1,
    });
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: data,
    });
    const json = await response.json();
    setResult(json["choices"][0]["text"]);
  }

  return (
    <div className="container">
      <style jsx>{`
        .container {
          margin: 20px;
        }
        input {
          width: 700px;
          border-radius: 3px;
          height: 30px;
          padding: 10px;
          margin-right: 5px;
        }
        button {
          height: 30px;
          background-color: #ffffff;
          border-radius: 5px;
        }
      `}</style>
      <form onSubmit={processPrompts}>
        <Input
          variant="filled"
          type="text"
          required
          id="prompt"
          size="lg"
          placeholder="I want to "
          width="700px"
          height="50px"
        />

        <Button
          backgroundColor="tomato"
          color="white"
          margin-left="10px"
          height="50px"
          size="sm"
          type="submit"
        >
          Submit
        </Button>
      </form>

      {result ? <Text>{result}</Text> : null}
    </div>
  );
}

export default Search;
