import { useRoutes, Link } from 'raviger';
import { Button } from 'evergreen-ui';
import './App.css';

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
        <Link href="/"><Button>Home</Button></Link>
        <Link href="/about"><Button>About</Button></Link>
        <Link href="/users/1"><Button>Tom</Button></Link>
        <Link href="/users/2"><Button>Jane</Button></Link>
      </div>
      {route}
    </div>
  );
};

export default App;
