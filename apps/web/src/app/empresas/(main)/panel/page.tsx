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
      <p>{"Checklist de pendientes"}</p>
      <p>{"Detalles de la empresa"}</p>
      {/* <p>{"Horarios de la empresa"}</p> */}
    </div>
  );
}
