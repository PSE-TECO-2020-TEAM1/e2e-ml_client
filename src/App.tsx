import { useRoutes, Link } from 'raviger';

const routes = {
  '/': () => <div>/</div>,
  '/about': () => <div>/about</div>,
  '/users/:userId': ({ userId } : { [k: string]: string }) => <div>/users/{userId}</div>
};

const App = () => {
  let route = useRoutes(routes);
  
  return (
    <div>
      <div>
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/users/1">Tom</Link>
        <Link href="/users/2">Jane</Link>
      </div>
      {route}
    </div>
  );
};

export default App;
