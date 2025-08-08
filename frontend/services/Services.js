export const AddUserToServer = async (user) => {
  const response = await fetch(`https://localhost:3000/api/signUp`, {
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
  console.log(process.env.REACT_APP_API_URL);
  const response = await fetch(`https://localhost:3000/api/login`, {
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
  const response = await fetch(`https://localhost:3000/host/addJob`, {
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
  const response = await fetch(`https://localhost:3000/store/addProfile`, {
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
