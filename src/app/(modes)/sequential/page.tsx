import Link from "next/link";

const SequentialTranslationsPage = () => {
  return (
    <section>
      <div className="container">
        <h2>Sequential translations page</h2>
        <ul>
          <li>
            <Link href="/sequential/2">#1</Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SequentialTranslationsPage;
