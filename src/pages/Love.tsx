import React, { useState } from "react";
import Buttons from "../component/share/Buttons";
import { FaRegHeart } from "react-icons/fa";
import ModalComponent from "../component/share/ModalComponent";

interface UserAction {
  sId: number;
  name: string;
  price: string;
  quantity: number;
}

interface Props {}

const Love: React.FC<Props> = () => {
  const [deleteOpenModal, setDeleteOpenModal] = useState<boolean>(false);
  const [editOpenModal, setEditOpenModal] = useState<boolean>(false);
  const [createOpenModal, setCreateOpenModal] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserAction>({} as UserAction);
  const [editedPrice, setEditedPrice] = useState<string>("");
  const [editedQuantity, setEditedQuantity] = useState<number>(0);
  const [createPrice, setCreatePrice] = useState<string>(""); // For the create modal
  const [createQuantity, setCreateQuantity] = useState<number>(0); // For the create modal

  const items = [
    { sId: 1, name: "Get 10 Loves", price: "$100", quantity: 10 },
    { sId: 2, name: "Get 20 Loves", price: "$200", quantity: 20 },
    { sId: 3, name: "Get 30 Loves", price: "$300", quantity: 30 },
    { sId: 4, name: "Get 40 Loves", price: "$400", quantity: 40 },
  ];

  const handleDelete = (values: UserAction) => {
    setUserData(values);
    setDeleteOpenModal(true);
  };

  const handleCreate = () => {
    setCreatePrice(""); // Clear the create modal price
    setCreateQuantity(0); // Clear the create modal quantity
    setCreateOpenModal(true); // Open the create modal
  };

  const handleEdit = (values: UserAction) => {
    setUserData(values);
    setEditedPrice(values.price); // Set the current price for editing
    setEditedQuantity(values.quantity); // Set the current quantity for editing
    setEditOpenModal(true);
  };

  const confirmDelete = () => {
    console.log("Deleted:", userData);
    setDeleteOpenModal(false);
  };

  const confirmCreate = () => {
    console.log("Created New Offer:", {
      name: `Get ${createQuantity} Loves`,
      price: createPrice,
      quantity: createQuantity,
    });
    setCreateOpenModal(false);
    // Add logic to actually create a new offer
  };

  const confirmEdit = () => {
    console.log(
      "Edited Item:",
      userData,
      "New Price:",
      editedPrice,
      "New Quantity:",
      editedQuantity
    );
    setEditOpenModal(false);
  };

  return (
    <div>
      <div className="flex justify-between px-4">
        <div>
          <h1>Created Offer</h1>
        </div>
        <div className="bg-[#4964C6] rounded-2xl py-2 px-4 text-white">
          <Buttons onClick={handleCreate}>Create new Offer</Buttons>
        </div>
      </div>
      {/* Created items */}
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2 grid-cols-8 gap-4 py-8">
        {items.map((item) => (
          <div
            key={item.sId}
            className="flex justify-center border items-center rounded-2xl border-gray-200 w-0 lg:w-40 md:w-48 h-40 text-center"
          >
            <div>
              <FaRegHeart className="mx-auto" size={25} color={"red"} />
              <h1 className="font-bold text-xl py-2">{item.name}</h1>
              <p>for {item.price}</p>
              <div className="flex justify-between py-2">
                <div>
                  <Buttons
                    onClick={() => handleDelete(item)}
                    className="text-red-600"
                  >
                    Delete
                  </Buttons>
                </div>

                <div>
                  <Buttons onClick={() => handleEdit(item)}>Edit</Buttons>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for confirming delete action */}
      <ModalComponent
        openModel={deleteOpenModal}
        setOpenModel={setDeleteOpenModal}
        title="Delete Item"
        subtitle={`Are you sure you want to delete the item "${userData.name}"?`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
      />

      {/* Modal for editing item */}
      <ModalComponent
        openModel={editOpenModal}
        setOpenModel={setEditOpenModal}
        title="Edit Item"
        subtitle={`Edit the details for "${userData.name}"`}
        confirmLabel="Save"
        cancelLabel="Cancel"
        onConfirm={confirmEdit}
      >
        {/* Content for editing */}
        <div className="py-4">
          <label
            htmlFor="quantity"
            className="block font-semibold text-gray-700"
          >
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            value={editedQuantity}
            onChange={(e) => setEditedQuantity(Number(e.target.value))}
            className="w-full mt-2 p-2 border rounded-lg"
            min="0"
          />

          <label
            htmlFor="price"
            className="block font-semibold text-gray-700 mt-4"
          >
            Price
          </label>
          <input
            id="price"
            type="text"
            value={editedPrice}
            onChange={(e) => setEditedPrice(e.target.value)}
            className="w-full mt-2 p-2 border rounded-lg"
          />
        </div>
      </ModalComponent>

      {/* Modal for creating a new item */}
      <ModalComponent
        openModel={createOpenModal}
        setOpenModel={setCreateOpenModal}
        title="Create New Offer"
        subtitle="Create a new offer with price and quantity"
        confirmLabel="Create"
        cancelLabel="Cancel"
        onConfirm={confirmCreate}
      >
        {/* Content for creating a new offer */}
        <div className="py-4">
          <label
            htmlFor="createQuantity"
            className="block font-semibold text-gray-700"
          >
            Quantity
          </label>
          <input
            id="createQuantity"
            type="number"
            value={createQuantity}
            onChange={(e) => setCreateQuantity(Number(e.target.value))}
            className="w-full mt-2 p-2 border rounded-lg"
            min="0"
          />

          <label
            htmlFor="createPrice"
            className="block font-semibold text-gray-700 mt-4"
          >
            Price
          </label>
          <input
            id="createPrice"
            type="text"
            value={createPrice}
            onChange={(e) => setCreatePrice(e.target.value)}
            className="w-full mt-2 p-2 border rounded-lg"
          />
        </div>
      </ModalComponent>
    </div>
  );
};

export default Love;
