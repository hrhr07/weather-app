import "./styles.css";

const btnConfirm = document.getElementById("confirmBtn");

const Form = document.getElementById("form");

btnConfirm.addEventListener("click", async (e) => {
  e.preventDefault();

  const location = document.getElementById("location").value;
  const result = document.getElementById("result");
  const apiKey = "QKN8SWZ4DUHXB8K4AW8FLKY2J";

  const url =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
    location +
    "?key=" +
    apiKey;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Invalid location");
    }

    const data = await response.json();

    const city = data.resolvedAddress;
    const temp = data.days[0].temp;
    const conditions = data.days[0].conditions;

    result.innerHTML = `
    <p><strong>City:</strong> ${city}</p>
    <p><strong>Temperature:</strong> ${temp}</p>
    <p><strong>Conditions:</strong> ${conditions}</p>
    `;
    Form.reset();
  } catch (error) {
    result.innerHTML = "City not found.";
    console.error(error);
  }
});
