import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import About from "./pages/About";
import Home from "./pages/Home";
import PropertyDetails from "./pages/PropertyDetails";

import Login from "./pages/Login";
import PropertiesList from "./pages/PropertiesList";
import Register from "./pages/Register";
import EstateForm from "./pages/seller/add-estate/EstateForm";
import SelectLocation from "./pages/seller/add-estate/SelectLocation";
import EstateImageUpload from "./pages/seller/add-estate/UploadEstateImages";

import Navbar from "./components/navbar/Navbar";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminProperties from "./pages/admin/AdminProperties";
import AdminPropertyDetails from "./pages/admin/AdminPropertyDetails";
// import AdminReports from "./pages/admin/AdminReports";
import ChatScreen from "./pages/Chat";
import EditPropertyForm from "./pages/seller/EditPropertyForm";
import ServiceHome from "./pages/service/ServiceHome";
import ServiceDetails from "./pages/ServiceDetails";
import Services from "./pages/Services";
import AdminManagers from "./pages/admin/AdminManagers";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/properties" element={<PropertiesList />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/property/:id" element={<PropertyDetails />} />
                  <Route path="/chat" element={<ChatScreen />} />
                  <Route
                    path="/service-details/:id"
                    element={<ServiceDetails />}
                  />
                </Routes>
              </>
            }
          />

          <Route
            path="/seller/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route
                    path="/"
                    element={<PropertiesList isSeller={true} />}
                  />

                  <Route
                    path="/estates/:id/edit"
                    element={<EditPropertyForm />}
                  />
                  <Route
                    path="/add-property/*"
                    element={
                      <Routes>
                        <Route path="/" element={<EstateForm />} />
                        <Route
                          path="/select-location"
                          element={<SelectLocation />}
                        />
                        <Route
                          path="/upload-images"
                          element={<EstateImageUpload />}
                        />
                      </Routes>
                    }
                  />
                </Routes>
              </>
            }
          />
          <Route
            path="/admin/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<AdminProperties />} />

                  <Route
                    path="/property/:id"
                    element={<AdminPropertyDetails />}
                  />
                  <Route path="/categories" element={<AdminCategories />} />
                  <Route path="/managers" element={<AdminManagers />} />
                  {/* <Route path="/reports" element={<AdminReports />} /> */}
                </Routes>
              </>
            }
          />
          <Route
            path="/service/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<ServiceHome />} />
                </Routes>
              </>
            }
          />
          <Route
            path="/manager/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<AdminProperties />} />
                </Routes>
              </>
            }
          />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
