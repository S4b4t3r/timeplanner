const axios = require('axios');
export default class Login {
    loginInput: HTMLInputElement;
    passwordInput: HTMLInputElement;
    submitInput: HTMLElement;
    popup: HTMLElement;

    constructor() {
        this.loginInput = document.querySelector('[data-ref="loginLogin"]');
        this.passwordInput = document.querySelector('[data-ref="loginPassword"]');
        this.submitInput = document.querySelector('[data-ref="loginSubmit"]');
        this.eventListener();
    }

    public eventListener = () => {
        this.submitInput.addEventListener('click', async () => {
            let response = await this.getToken(this.loginInput, this.passwordInput);
            if(response.status == 200) {
                let token = response.data.token;
                let mail = this.loginInput.value;
                localStorage.setItem('token', token);
                localStorage.setItem('mail', mail);
                location.reload();
            }
        })
    };

    async getToken(login, password) {

        let response = await axios(
            {
                method: 'post',
                url: 'http://localhost:8888/index.php/authentication_token',   
                data: {
                    email: login.value,
                    password: password.value 
                }
            }
        )
        
        return response;
    }
}
