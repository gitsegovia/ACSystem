const URI_GENESYS = process.env.URI_GENESYS || "https://api-asistencia.guarico.gob.ve";
const URI_SISAP = process.env.URI_SISAP || "https://api-sisap-querys.guarico.gob.ve";

export default {
  genesys: URI_GENESYS,
  query_sisap: URI_SISAP,
};
