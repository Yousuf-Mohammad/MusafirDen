import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
function App() {
  return (
        <>
          <Header/>
            <main className="py-3">
              <Container>
              <h1>WanderLust </h1> 
              <HomeScreen/>
              </Container>
            </main>
            <Footer/>
        </>
  );
}

export default App;
