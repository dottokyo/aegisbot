const PATH = "https://json..";

const handleResponse = (response) => {
  return response.json();
}

export const getDataG = () => {
  return fetch(PATH + "/..", {
	method: "GET",
  })
    .then(handleResponse)
    .then(data => {
      return data.values
    })
};