import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/ui/Modal/Modal";
import Button from "../../components/ui/Button/Button";
import Illustration from "../../assets/logout_illustration.jpg";

function Logout() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", "false");
    navigate("/login");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h1 className="text-4xl font-semibold mb-8">Logout</h1>
      <img src={Illustration} alt="Logout Illustration" className="w-64 mb-8" />
      <Button onClick={handleShowModal} className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md shadow-md transition duration-300 ease-in-out">
        Logout
      </Button>
      <Modal show={showModal} onClose={handleCloseModal} backdrop={true}>
        <h2 className="text-xl font-semibold mb-4">Apakah anda yakin ingin logout?</h2>
        <div className="flex justify-evenly mt-4">
          <Button onClick={handleCloseModal} className="mr-4">
            Batal
          </Button>
          <Button onClick={handleLogout} variant="delete">
            Logout
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Logout;
