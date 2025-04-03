export default function Footer() {
    return (
      <footer className="mt-10 py-4 text-center text-sm bg-gray-900 text-gray-400">
        <p>© {new Date().getFullYear()} FindyIt. All rights reserved.</p>
        <p>
          Made with ❤️ by <span className="font-semibold text-gray-200">Irfan</span>
        </p>
      </footer>
    );
  }
  