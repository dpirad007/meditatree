import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import LoginBackground from "../../components/LoginBackground";
import { useAuth } from "../../utils/AuthContext";

import easyFetch from "../../utils/easyFetch";
import { PUBLIC } from "../../utils/constants";

import "./LoginAndRegister.css";

const Login = ({ form, setForm }) => {
  return (
    <>
      <h1>login</h1>
      <div className="input_fields">
        <label>
          <span>username</span>
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </label>
        <label>
          <span>password</span>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>
      </div>
    </>
  );
};

const Register = ({ form, setForm }) => {
  return (
    <>
      <h1>register</h1>
      <div className="input_fields">
        <label>
          <span>username</span>
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </label>
        <label>
          <span>password</span>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>
        <label>
          <span>confirm password</span>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
        </label>
      </div>
    </>
  );
};
const LoginAndRegister = () => {
  const history = useHistory();
  const audioRef = useRef();

  const { userData, userMutate } = useAuth();

  useEffect(() => {
    audioRef.current.volume = 0.1;
  }, []);

  useEffect(() => {
    if (userData) {
      history.push("/users");
    }
  }, [userData, history]);

  const [loginOrRegister, setLoginOrRegister] = useState(true);
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const change = () => {
    setLoginOrRegister(!loginOrRegister);
    setForm({
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <LoginBackground />
      <div className="login_or_register">
        {loginOrRegister ? (
          <Login form={form} setForm={setForm} />
        ) : (
          <Register form={form} setForm={setForm} />
        )}
        <div className="lor_buttons">
          <button className="inv" onClick={change}>
            {loginOrRegister ? "register" : "login"}
          </button>
          <button
            onClick={async () => {
              const { data, error } = await easyFetch(
                `auth/${loginOrRegister ? "login" : "register"}`,
                form
              );
              if (error) {
                console.log(error);
                error.map(({ field, message }) =>
                  setErrors({ ...errors, [field]: message })
                );
              } else {
                await userMutate(data, false);
                history.push("/");
              }
            }}
          >
            {loginOrRegister ? "login" : "register"}
          </button>
        </div>
        <audio
          ref={audioRef}
          src={`${PUBLIC}/music/backsong.mp3`}
          loop
          autoPlay
        />
      </div>
    </>
  );
};

export default LoginAndRegister;
