export const getGraphQlError = (error: any) => {
  return error.toString().replace("Error: GraphQL error: ", "");
};
