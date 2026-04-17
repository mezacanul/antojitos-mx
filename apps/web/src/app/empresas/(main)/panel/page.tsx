// "use client";
export default function Home() {
  return (
    <div className="flex h-full flex-col gap-4">
      <Checklist />
    </div>
  );
}

function Checklist() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Checklist</h2>
    </div>
  );
}
