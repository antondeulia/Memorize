import Link from "next/link";

const HomePage = () => {
  return (
    <section className="mt-6">
      <div className="container">
        <h1 className="text-center text-2xl font-bold">Welcome to MemoLang!</h1>

        <div className="mt-8">
          <h2>Modes:</h2>
          <ul>
            <li className="text-blue-500 hover:underline pt-2 px-4">
              <Link href="/sequential">Sequential Mode</Link>
            </li>
            <li className="text-blue-500 hover:underline pt-2 px-4">
              <Link href="/dialog">Dialog Mode</Link>
            </li>
            <li className="text-blue-500 hover:underline pt-2 px-4">
              <Link href="/sentences">Sentences Mode</Link>
            </li>
            <li className="text-blue-500 hover:underline pt-2 px-4">
              <Link href="/practice">Practice Mode</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
