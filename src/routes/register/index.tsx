import { loader } from "./RegisterLoader";
import { action } from "./RegisterAction";
import Register from "./Register";

const LoginRouter = {
  RegisterLoader: loader,
  Register,
  RegisterAction: action,
};

export default LoginRouter;
