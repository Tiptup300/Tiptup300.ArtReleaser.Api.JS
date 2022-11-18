import connectionState from "./_state.js";

export default function end() {
  let connection = connectionState.get();
  if (!connection) {
    return;
  }
  connection.end();
  connectionState.clear();
  console.log("Connection to mysql ended.");
}
