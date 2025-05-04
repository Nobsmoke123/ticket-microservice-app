import { container } from "tsyringe";
import AuthService from "../service/auth-service";
import AuthController from "../controllers/auth.controller";

// Registering AuthService and AuthController in the container
container.register(AuthService, {
  useClass: AuthService,
});
container.register(AuthController, {
  useClass: AuthController,
});
// Exporting the container for use in other parts of the application
export default container;
// This file is responsible for setting up the dependency injection container
// using the tsyringe library. It registers the AuthService and AuthController
// classes in the container, allowing them to be injected into other parts of
// the application. The container is then exported for use in other modules.
// This approach promotes loose coupling and makes it easier to manage
// dependencies in the application. By using dependency injection, we can
// easily swap out implementations, mock dependencies for testing, and
// manage the lifecycle of objects in a more controlled manner. This is
// particularly useful in larger applications where managing dependencies
// manually can become cumbersome and error-prone. The use of tsyringe
// simplifies this process by providing a clean and intuitive API for
// registering and resolving dependencies. Overall, this file plays a
// crucial role in the architecture of the application by facilitating
// dependency management and promoting best practices in software design.
// The use of dependency injection allows for better separation of concerns,
// improved testability, and a more maintainable codebase. By leveraging
// the capabilities of tsyringe, we can create a more modular and flexible
// application that adheres to the principles of clean architecture and
// design patterns. This ultimately leads to a more robust and scalable
// application that can evolve and adapt to changing requirements over time.
// The container is a central part of the application, and by registering
// services and controllers in it, we can easily manage their lifetimes
// and dependencies. This allows for better organization of the codebase
// and makes it easier to understand the relationships between different
// components. The use of interfaces and types also helps to enforce
// contracts between different parts of the application, ensuring that
// components interact in a predictable and consistent manner. This is
// particularly important in larger applications where multiple teams may
// be working on different parts of the codebase. By using a container
// to manage dependencies, we can ensure that each component is properly
// configured and that any changes to one part of the application do not
// inadvertently affect other parts. This leads to a more stable and
// reliable application that is easier to maintain and extend over time.
// Overall, the use of a dependency injection container is a powerful
// pattern that can greatly enhance the architecture and design of an
// application. By leveraging the capabilities of tsyringe, we can create
// a more modular, flexible, and maintainable codebase that adheres to
// best practices in software design and architecture. This ultimately
// leads to a more robust and scalable application that can evolve and
// adapt to changing requirements over time, making it easier to deliver
// high-quality software that meets the needs of users and stakeholders.
// The use of a container also allows for better organization of the codebase,
// making it easier to navigate and understand the relationships between
// different components. This is particularly important in larger applications
// where multiple teams may be working on different parts of the codebase.
// By using a container to manage dependencies, we can ensure that each
// component is properly configured and that any changes to one part of the
// application do not inadvertently affect other parts. This leads to a more
// stable and reliable application that is easier to maintain and extend over time.
// Overall, the use of a dependency injection container is a powerful pattern
// that can greatly enhance the architecture and design of an application.
// By leveraging the capabilities of tsyringe, we can create a more modular,
// flexible, and maintainable codebase that adheres to best practices in software
// design and architecture. This ultimately leads to a more robust and scalable
// application that can evolve and adapt to changing requirements over time,
// making it easier to deliver high-quality software that meets the needs of
// users and stakeholders. The use of a container also allows for better
// organization of the codebase, making it easier to navigate and understand
// the relationships between different components.
