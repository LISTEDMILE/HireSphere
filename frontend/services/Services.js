export const AddUserToServer = async (user) => {
  const response = await fetch(`{process.env.REACT_APP_API_URL}/api/signUp`, {
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
  const response = await fetch(`{process.env.REACT_APP_API_URL}/api/login`, {
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
  const response = await fetch(`{process.env.REACT_APP_API_URL}/host/addJob`, {
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
  const response = await fetch(
    `{process.env.REACT_APP_API_URL}/store/addProfile`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(profile),
    }
  );
  const data = await response.json();
  return data;
};
