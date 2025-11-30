// import Home from "./pages/Home";
// import { AppLayout } from "./components/layouts/AppLayout";
// import { FormPage } from "./pages/FormPage";

// export default function App() {
//   return (
//     <AppLayout>
//       <Home />
//       <div className="my-12">
//         <FormPage />
//       </div>
      
//     </AppLayout>
//   );
// }

import Home from "./pages/Home";
import { FormPage } from "./pages/FormPage";
import {DynamicForm} from "./components/form/DynamicForm";
import { AppLayout } from "./components/layouts/AppLayout";

export default function App() {
  return (
    <AppLayout>
      <Home />

      <div className="my-12 gap-12 flex flex-col">
        <FormPage />
      </div>
    </AppLayout>
  );
}
