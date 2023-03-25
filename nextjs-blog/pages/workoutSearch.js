import { Input, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

function WorkoutSearch() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "You are a helpful, empathetic, and friendly personal trainer. You are tasked with helping your user find their ideal workout plan. ",
    },
    {
      role: "system",
      content:
        "Whenever giving a suggestion, give them sets and reps. Only give these reccomendations and nothing else.",
    },
  ]);

  const processPrompts = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    const apiKey = "NULL"; // Replace with your actual OpenAI API key
    const url = "https://api.openai.com/v1/chat/completions";
    var temp = { role: "user", content: event.target.prompt.value };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };
    const data = JSON.stringify({
      messages: messages,
      model: "gpt-3.5-turbo",
      max_tokens: 100,
    });

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: data,
    });

    const jsonData = await response.json();

    const text = jsonData?.choices?.[0]?.message?.content;
    var constructResponse = { role: "assistant", content: text };
    setMessages([...messages, temp, constructResponse]);
    return text;
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

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
          backgroundColor="black"
          color="white"
          margin-left="10px"
          height="50px"
          size="sm"
          type="submit"
        >
          Submit
        </Button>
      </form>
      <Dialogue messages={messages.slice(2)} />
    </div>
  );
}

function Dialogue({ messages }) {
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <strong>{message.role}: </strong>
          {message.content}
        </div>
      ))}
    </div>
  );
}

export default WorkoutSearch;
