const getFromStorage = function(key, defaultValue) {
  return JSON.parse(localStorage.getItem(key)) || defaultValue
}

const addToStorage = function(key, val) {
  localStorage.setItem(key, val);
}

const clearStorage = function() {
  localStorage.clear();
}


export default {getFromStorage, addToStorage, clearStorage}