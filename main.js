const inputQuestion = document.getElementById("question");
const inputResponse = document.getElementById("response");

inputQuestion.addEventListener("keypress", (e) => {
  if (inputQuestion.value && e.key === "Enter") {
    e.preventDefault();
    sendQuestion();
  }
});

const API_KEY_CODE = "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";

function sendQuestion() {
    var sQuestion = inputQuestion.value;
  
    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + API_KEY_CODE,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: sQuestion,
        max_tokens: 2048, // tamanho da resposta
        temperature: 0.5, // criatividade na resposta
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (inputResponse.value) inputResponse.value += "\n";
  
        if (json.error?.message) {
          inputResponse.value += `Error: ${json.error.message}`;
        } else if (json.choices?.[0].text) {
          var text = json.choices[0].text || "Sem resposta";
  
          inputResponse.value += "Chat GPT: " + text;
        }
  
        inputResponse.scrollTop = inputResponse.scrollHeight;
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => {
        inputQuestion.value = "";
        inputQuestion.disabled = false;
        inputQuestion.focus();
      });
  
    if (inputResponse.value) inputResponse.value += "\n\n\n";
  
    inputResponse.value += `Eu: ${sQuestion} \n`;
    inputQuestion.value = "Carregando...";
    inputQuestion.disabled = true;
  
    inputResponse.scrollTop = inputResponse.scrollHeight;
  }
