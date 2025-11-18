import axiosConfig from "./axiosConfig";

const apiUrl = "https://expense-backend-x9ze.onrender.com/";

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
  return await axiosConfig(
    "get",
    "https://expense-backend-x9ze.onrender.com/budget/1",
    ""
  );
};

export const patchBudget = async (reqBody) => {
  return await axiosConfig(
    "patch",
    "https://expense-backend-x9ze.onrender.com/budget/1",
    reqBody
  );
};
