
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


export const LoginUserToServer = async (user) => { 
    const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    const data = await response.json();
    
    console.log("Login response:", data);
    return data;
}