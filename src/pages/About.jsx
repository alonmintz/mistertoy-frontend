import { AccordionGroup } from "../cmps/general/AccordionGroup";
import { AccordionItem } from "../cmps/general/AccordionItem";

export function About() {
  return (
    <section className="about">
      <AccordionGroup>
        <AccordionItem title="About the Application">
          <ul>
            <li>
              🧭 <strong>Dynamic Routing</strong>: Navigate between pages such
              as Home, About, Contact, and Cart using client-side routing.
            </li>
            <li>
              📦 <strong>Product Catalog</strong>: Browse a comprehensive list
              of toys, complete with images, pricing, and other key details.
            </li>
            <li>
              🔍 <strong>Detailed Views</strong>: Access individual toy pages
              for in-depth information about each product.
            </li>
            <li>
              ✏️ <strong>Toy Management</strong>: Add, edit, or delete toys via
              dedicated admin-friendly interfaces.
            </li>
            <li>
              🛒 <strong>Shopping Cart</strong>: Add toys to a cart and view a
              summary of selected items for purchase.
            </li>
            <li>
              📁 <strong>Modular Design</strong>: Features are organized into
              reusable components and clearly separated views for
              maintainability.
            </li>
            <li>
              🔔 <strong>User Feedback</strong>: Real-time messaging system for
              user notifications and alerts.
            </li>
          </ul>
        </AccordionItem>

        <AccordionItem title="Features">
          <ul>
            <li>
              🚗 <strong>SPA Routing</strong>: Seamless navigation between views
              using React Router
            </li>
            <li>
              📦 <strong>State Management</strong>: Centralized app state with
              Redux Toolkit
            </li>
            <li>
              🎨 <strong>Responsive UI</strong>: Styled with SASS for
              maintainability and flexibility
            </li>
            <li>
              🌐 <strong>API Integration</strong>: Communication with backend
              via Axios
            </li>
            <li>
              🚀 <strong>Optimized Build</strong>: Built using Vite for fast
              development and deployment
            </li>
            <li>
              🔍 <strong>Linting</strong>: ESLint integration for code quality
              and consistency
            </li>
          </ul>
        </AccordionItem>

        <AccordionItem title="Technologies Used">
          <ul>
            <li>⚛️ React 19</li>
            <li>🧠 Redux Toolkit</li>
            <li>🧭 React Router DOM v7</li>
            <li>🌐 Axios</li>
            <li>🎨 SASS</li>
            <li>🖼 Font Awesome</li>
            <li>⚡ Vite</li>
            <li>🔍 ESLint</li>
          </ul>
        </AccordionItem>
      </AccordionGroup>
    </section>
  );
}
