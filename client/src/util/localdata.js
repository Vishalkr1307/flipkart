export const postLocalData = (key, data) => {
    if (key && data) {
      const dataStore = typeof data === 'object' ? JSON.stringify(data) : data;
      localStorage.setItem(key, dataStore);
    }
  };
  
  export const getLocalData = (key) => {
    const storedData = localStorage.getItem(key);
  
    try {
      // Attempt to parse the stored data as JSON
      return JSON.parse(storedData);
    } catch (error) {
      // If parsing fails or the data is not a JSON string, return it as is
      return storedData;
    }
  };
  