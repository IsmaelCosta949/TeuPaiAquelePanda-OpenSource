export function ErrorBoundaryLayout({ error }: { error: Error }) {
  return (
    <div>
      <h1>Ops, o panda tropeçou! 🐼</h1>
      <p>Algo deu errado por aqui.</p>
    </div>
  );
}
