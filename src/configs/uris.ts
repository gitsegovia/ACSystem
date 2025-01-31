const URI_GENESYS = process.env.URI_GENESYS || "http://localhost:4000";
const URI_SISAP = process.env.URI_SISAP || "http://localhost:4000";

export default {
  genesys: URI_GENESYS,
  query_sisap: URI_SISAP,
};
