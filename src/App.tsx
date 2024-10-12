import Header from "./components/common/Header";
import list from "./constants/nav";
import Sidebar from "./components/common/Sidebar";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header list={list} />
      </header>
      <section className="mx-20 flex justify-center gap-4">
        <Sidebar />
        <main className="grow pt-10">
          <SearchBar />
          <h1 className="text-3xl font-bold mb-4">This is the main content</h1>
        </main>
      </section>
    </div>
  );
}

export default App;
