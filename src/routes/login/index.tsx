import { loader } from "./LoginLoader";
import { action } from "./LoginAction";
import Login from "./Login";

const LoginRouter = {
  LoginLoader: loader,
  Login,
  LoginAction: action,
};

export default LoginRouter;
