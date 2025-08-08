import { apiURL } from "../apiUrl";

export const AddUserToServer = async (user) => {
  const response = await fetch(`${apiURL}/api/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

export const LoginUserToServer = async (user) => {
  const response = await fetch(`${apiURL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });
  const data = await response.json();
  return data;
};

export const AddJobToServer = async (job) => {
  const response = await fetch(`${apiURL}/host/addJob`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(job),
  });
  const data = await response.json();
  return data;
};

export const AddProfileToServer = async (profile) => {
  const response = await fetch(`${apiURL}/store/addProfile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(profile),
  });
  const data = await response.json();
  return data;
};
