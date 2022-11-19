export default function getEncodedTokenSecret() {
  return Buffer.from(process.env.TOKEN_SECRET).toString("base64");
}
