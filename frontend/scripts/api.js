const API_URL = "https://aegisbot-80ar.onrender.com/api/trader";  // Замените на правильный URL

const handleResponse = (response) => {
  return response.json();
}

export const getData = () => {
  return fetch(API_URL, {
    method: "GET",
  })
    .then(handleResponse)
    .then(data => {
      // Возвращаем только значение portfolioValue
      return data;
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      return 0;  // В случае ошибки возвращаем 0
    });
};