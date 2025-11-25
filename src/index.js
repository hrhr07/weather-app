import "./styles.css";

const btnConfirm = document.getElementById("confirmBtn");

const Form = document.getElementById("form");

function getIconName(condition) {
  const text = condition.toLowerCase();

  if (text.includes("clear") || text.includes("sun")) return "sunny";
  if (text.includes("part") || text.includes("mostly")) return "partly-cloudy";
  if (text.includes("cloud") || text.includes("overcast")) return "cloudy";
  if (
    text.includes("rain") ||
    text.includes("shower") ||
    text.includes("drizzle")
  )
    return "rain";
  if (text.includes("snow") || text.includes("flurr")) return "snow";
  if (text.includes("thunder") || text.includes("storm")) return "storm";
  if (text.includes("wind") || text.includes("breeze")) return "wind";

  return "cloudy";
}

async function loadIcon(iconName) {
  try {
    const icon = await import(`./icons/${iconName}.png`);
    return icon.default;
  } catch (error) {
    console.error("Icon not found:", iconName);
    const fallback = await import("./icons/cloudy.png");
    return fallback.default;
  }
}

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

    const iconName = getIconName(conditions);
    const iconURL = await loadIcon(iconName);

    result.innerHTML = `
    <p><strong>City:</strong> ${city}</p>
    <p><strong>Temperature:</strong> ${temp}</p>
    <p><strong>Conditions:</strong> ${conditions}</p>
    <img src="${iconURL}" alt="${conditions}" width="80">
    `;
    Form.reset();
  } catch (error) {
    result.innerHTML = "City not found.";
    console.error(error);
  }
});
