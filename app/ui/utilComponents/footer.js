import Link from "next/link";

const Footer = () => {
  return (
    <footer className="px-6 py-4 bg-black text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between">
        <Link href="/">© 2024 Fahim</Link>
        <a
          href="/lost-found-hub/privacyandsecurity"
          className="text-blue-500 hover:text-blue-700"
        >
          Privacy & Security Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
