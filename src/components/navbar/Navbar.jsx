import AdminNavbar from "./AdminNavbar";
import CustomerNavbar from "./CustomerNavbar";
import ManagerNavbar from "./ManagerNavbar";
import SellerNavbar from "./SellerNavbar";
import ServiceNavbar from "./ServiceNavbar";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  if (user) {
    switch (user.type) {
      case "Seller":
        return <SellerNavbar />;

      case "Admin":
        return <AdminNavbar />;

      case "ServiceAdmin":
        return <ServiceNavbar />;

      case "Manager":
        return <ManagerNavbar />;
      default:
        return <CustomerNavbar />;
    }
  } else {
    return <CustomerNavbar />;
  }
}
