import { projects } from "./const/navItems";

function App() {
  const path = window.location.pathname;

  const currentProject = projects.find((project) => project.path === path);

  if (currentProject) {
    return currentProject.component;
  }

  return (
    <div className="max-w-7xl bg-amber-50 border mx-auto p-5">
      <h1 className="text-4xl font-serif tracking-wide font-bold mb-8">My Mini Projects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {projects.map((project) => (
          <a
            key={project.path}
            href={project.path}
            title={project.title}
            className="block bg-white hover:bg-amber-300 border rounded-lg p-4 hover:shadow-lg transition-all duration-200"
          >
            <h3 className="truncate font-medium">{project.title}</h3>
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
