export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <Logo />
      {children}
      <Options />
    </div>
  );
}

function Logo() {
  return (
    <div>
      <p>Logo</p>
    </div>
  );
}

function Options() {
  return (
    <div>
      <p>Options</p>
    </div>
  );
}
