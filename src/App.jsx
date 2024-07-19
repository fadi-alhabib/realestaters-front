import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PropertyDetails from "./pages/PropertyDetails";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PropertiesList from "./pages/PropertiesList";
import EstateImageUpload from "./pages/seller/add-estate/UploadEstateImages";
import EstateForm from "./pages/seller/add-estate/EstateForm";
import SelectLocation from "./pages/seller/add-estate/SelectLocation";

import SellerNavbar from "./components/SellerNavbar";
import ChatScreen from "./pages/Chat";
import EditPropertyForm from "./pages/seller/EditPropertyForm";
import Services from "./pages/Services";
import AdminProperties from "./pages/admin/AdminProperties";
import AdminPropertyDetails from "./pages/admin/AdminPropertyDetails";

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
                </Routes>
              </>
            }
          />

          <Route
            path="/seller/*"
            element={
              <>
                <SellerNavbar />
                <Routes>
                  <Route
                    path="/"
                    element={<PropertiesList isSeller={true} />}
                  />
                  <Route path="/inbox" element={<ChatScreen />} />
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
                {/* <AdminNavbar /> */}
                <Routes>
                  <Route path="/" element={<AdminProperties />} />
                  <Route
                    path="/property/:id"
                    element={<AdminPropertyDetails />}
                  />
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
