import Logo from "./assets/logo.svg";

export default function Header({ setRoute }) {
  return (
    <>
      <header className="flex items-center mb-12 justify-between">
        <div className="flex items-center">
          <img src={Logo} alt="logo" className="h-10" />
        </div>
        <div className="ml-4 text-sm text-zinc-400 flex gap-8">
          <button
            onClick={() => setRoute("create")}
            className="hover:text-zinc-200"
          >
            Create Image
          </button>
          <button
            onClick={() => setRoute("downloaded")}
            className="hover:text-zinc-200"
          >
            Downloaded
          </button>
        </div>
      </header>
    </>
  );
}
