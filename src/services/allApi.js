import axiosConfig from "./axiosConfig";

const apiUrl = "http://localhost:3000/expense/";

export const getExpense = async () => {
  return await axiosConfig("get", apiUrl, "");
};

export const patchExpense = async (id, reqBody) => {
  return await axiosConfig("patch", apiUrl + id, reqBody);
};

export const postExpense = async (reqBody) => {
  return await axiosConfig("post", apiUrl, reqBody);
};

export const deleteExpense = async (id) => {
  return await axiosConfig("delete", apiUrl + id, "");
};

export const getBudget = async () => {
  return await axiosConfig("get", "http://localhost:3000/budget/1", "");
};

export const patchBudget = async (reqBody) => {
  return await axiosConfig("patch", "http://localhost:3000/budget/1", reqBody);
};
