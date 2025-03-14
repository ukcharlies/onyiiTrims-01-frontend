import {
  Button,
  Card,
  Navbar,
  DarkThemeToggle,
  Flowbite,
  Alert,
} from "flowbite-react";

function App() {
  return (
    <Flowbite>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <Navbar fluid className="shadow-md">
          <Navbar.Brand href="/">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Onyi Trims
            </span>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <DarkThemeToggle />
          </div>
        </Navbar>

        {/* Main Content */}
        <div className="container mx-auto p-4">
          <Alert color="info" className="mb-4">
            <span className="font-medium">Flowbite Test Alert!</span> This alert
            shows that Flowbite is working.
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Test Card 1 */}
            <Card>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Test Card 1
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                This is a Flowbite card component test.
              </p>
              <Button>
                Read more
                <svg
                  className="-mr-1 ml-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </Card>

            {/* Test Card 2 */}
            <Card>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Test Card 2
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Testing dark mode compatibility.
              </p>
              <Button color="success">Success Button</Button>
            </Card>

            {/* Test Card 3 */}
            <Card>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Test Card 3
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Testing different button variants.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button color="warning">Warning</Button>
                <Button color="failure">Danger</Button>
                <Button outline>Outline</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Flowbite>
  );
}

export default App;
