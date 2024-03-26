import * as userService from "../../services/userService.js";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { validasaur } from "../../deps.js";


const userValidationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required,validasaur.minLength(4)]
}

const getUserData = async(request) => {
    const body = request.body({type:"form"});
    const params = await body.value;
    const password = params.get("password");
    const email = params.get("email");
    return {
        email: email,
        password: password,
    } 
}

const registerUser = async({request,response,render}) => {
    const userData = await getUserData(request);

    const [passes,errors] = await validasaur.validate(userData,userValidationRules);

    if (!passes) {
        userData.validationErrors = errors;
        render("registration.eta",userData);
    } else {
        const checkExistingUser = await userService.existingUsers(userData.email);
    if (checkExistingUser.length === 0) {
    const hash = await bcrypt.hash(userData.password);
    await userService.addUser(userData.email,hash);
    response.redirect("/auth/login");
    } else {
        userData.alreadyExists = true;
        render("registration.eta",userData);
    }
     
    }
}



const showRegistrationForm = ({render}) => {
    render("registration.eta");
}


export {registerUser,showRegistrationForm};