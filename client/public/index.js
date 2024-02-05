
const authUserForm = async (email, password) =>{
    const url = 'http://localhost:3001/api/users/auth-user';
     
    try {
        const response = await fetch(url,{
            method: 'POST',
            headers:{
                'content-type': 'application/json',
            },
            body: JSON.stringify({email,password}),
        });

        if (!response.ok) {
            throw new Error(`Failed auth: ${response.statusText}`)
        }
        
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}

function handleLogin(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(email);
    console.log(password);

    authUserForm(email, password)
    .then(resultado =>{
        if (resultado.cantidad_usuarios === 1) {
            console.log("confirmed user");
            window.location.href = 'menu.html';
        }else{
            console.log("error");
            alert('Failed Login')
        }
    })
}