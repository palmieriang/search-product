export const fetchSuggestions = (searchTerm) => {
  return fetch(
    "https://asoscarewebinterviewstub.azurewebsites.net/api/search",
    {
      method: "POST",
      body: JSON.stringify({
        q: searchTerm,
      }),
    }
  ).then((res) => res.json());
};

export const fetchProductDetail = (id) => {
  return fetch(
    "https://asoscarewebinterviewstub.azurewebsites.net/api/product",
    {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
    }
  ).then((res) => res.json());
};
