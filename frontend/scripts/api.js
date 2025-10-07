const PATH = "https://json..";

const handleResponse = (response) => {
  return response.json();
}

export const getData = () => {
  return fetch(PATH + "/..", {
	method: "GET",
  })
    .then(handleResponse)
};