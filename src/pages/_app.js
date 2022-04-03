import "../styles/style.scss";
import { PointsProvider } from "../context/context";

function MyApp({ Component, pageProps }) {
  return (
    <PointsProvider>
      <Component {...pageProps} />
    </PointsProvider>
  );
}

export default MyApp;
