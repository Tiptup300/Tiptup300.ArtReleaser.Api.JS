import connectionState from "./connectionState.js";

export default function query(qry, params) {
  return new Promise((resolve, reject) => {
    connectionState
      .get()
      .query(qry, params ? params : [], (error, rows, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows);
        }
      });
  });
}
