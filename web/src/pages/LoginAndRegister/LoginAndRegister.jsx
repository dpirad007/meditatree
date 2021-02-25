import backsong from '../../music/backsong.mp3';

const LoginAndRegister = () => {
  return (
    <div>
      <h1>Login</h1>
      <embed src={backsong} loop={true} autostart={true} hidden={true} />
    </div>
  );
};

export default LoginAndRegister;
