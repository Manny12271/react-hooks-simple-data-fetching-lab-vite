import React, { useState, useEffect } from "react";

function App() {
  // State for storing the current dog image URL
  const [dogImage, setDogImage] = useState("");

  // State to track if data is loading
  const [loading, setLoading] = useState(true);

  /**
   * Fetch a random dog image from the Dog CEO API
   * This is used both when the component first mounts
   * and when the user clicks "Get New Dog"
   */
  const fetchDogImage = async () => {
    try {
      setLoading(true); // Show loading message
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      setDogImage(data.message); // "message" contains the image URL
    } catch (error) {
      console.error("Error fetching dog image:", error);
    } finally {
      setLoading(false); // Hide loading message
    }
  };

  /**
   * useEffect runs once when the component mounts.
   * It calls fetchDogImage to load the first dog image.
   */
  useEffect(() => {
    fetchDogImage();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>🐶 Random Dog Image</h1>

      {/* Show loading text while fetching */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Display the current dog image */}
          <img
            src={dogImage}
            alt="A random dog"
            style={{
              maxWidth: "400px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          />
          <br />
        </>
      )}

      {/* Button to fetch a new random dog image */}
      <button
        onClick={fetchDogImage}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          cursor: "pointer",
          borderRadius: "8px",
        }}
      >
        Get New Dog 🐾
      </button>
    </div>
  );
}

export default App;