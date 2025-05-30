
export const AddUserToServer = async (user) => {
   
    const response = await fetch("http://localhost:3000/api/signUp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    const data = await response.json();
   
    return data;
}