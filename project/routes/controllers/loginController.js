import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
 
const showLoginForm = ({render}) => {
    render("login.eta");
}

const processLogin = async({request,response,state}) => {
    const body = request.body({type:"form"});
    const params = await body.value;

    const userFromDatabase = await userService.existingUsers(params.get("email"));

    if (userFromDatabase.length != 1 ) {
        response.redirect("/auth/login");
        return;
    }

    const user = userFromDatabase[0];
    const passwordMatches = await bcrypt.compare(
        params.get("password"),
        user.password,
    )

    if(!passwordMatches) {
        response.redirect("/auth/login");
        return;
    }

    await state.session.set("user",user);
    response.redirect("/topics");
}


export { processLogin, showLoginForm}