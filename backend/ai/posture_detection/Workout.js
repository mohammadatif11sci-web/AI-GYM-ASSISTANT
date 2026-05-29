import React from "react";

function Workout() {

  const openPushup = () => {
    alert("Starting Pushup Counter...");
  };

  const openSquat = () => {
    alert("Starting Squat Counter...");
  };

  return (

    <div style={styles.container}>

      <h1>🏋️ AI Workout Trainer</h1>

      <div style={styles.card}>
        <h2>Pushup Counter</h2>

        <button
          onClick={openPushup}
          style={styles.button}
        >
          Start Pushups
        </button>
      </div>

      <div style={styles.card}>
        <h2>Squat Counter</h2>

        <button
          onClick={openSquat}
          style={styles.button}
        >
          Start Squats
        </button>
      </div>

    </div>
  );
}

const styles = {

  container: {
    textAlign: "center",
    padding: "40px",
  },

  card: {
    border: "1px solid gray",
    padding: "20px",
    margin: "20px auto",
    width: "300px",
    borderRadius: "10px",
  },

  button: {
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Workout;