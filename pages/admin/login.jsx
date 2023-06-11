import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.css";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      await axios.post("https://food-ordering-app-l4eo.vercel.app/api/login", {
        username,
        password,
      });
      console.log(username + password)
      router.push("/admin");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Yönetici Paneli</h1>
        <input
          placeholder="kullanıcı adı"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="şifre"
          type="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick} className={styles.button}>Giriş Yap</button>
        {error && <span className={styles.error}>Yanlış Kullanıcı Bilgileri!</span>}
      </div>
    </div>
  );
};

export default Login;