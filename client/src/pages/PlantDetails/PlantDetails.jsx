import { useState } from "react";
import { useLoaderData } from "react-router";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import Button from "../../components/Shared/Button/Button";
import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import useAuth from "../../hooks/useAuth";

const PlantDetails = () => {
  let [isOpen, setIsOpen] = useState(false);
  const plant = useLoaderData();
const {user} = useAuth()
  const { name, image, category, quantity, price, seller, } = plant || {}

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Container>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12">
        {/* Header */}
        <div className="flex flex-col gap-6 flex-1">
          <div>
            <div className="w-full overflow-hidden rounded-xl">
              <img
                className="object-cover w-full"
                src={image}
                alt="header image"
              />
            </div>
          </div>
        </div>
        <div className="md:gap-10 flex-1">
          {/* Plant Info */}
          <Heading title={name} subtitle={`Category: ${category}`} />
          <hr className="my-6" />
          <div
            className="
          text-lg font-light text-neutral-500"
          >
            Professionally deliver sticky testing procedures for next-generation
            portals. Objectively communicate just in time infrastructures
            before.
          </div>
          <hr className="my-6" />

          <div
            className="
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              "
          >
          <div>{`Seller: ${seller?.name}`}</div>

            <img
              className="rounded-full"
              height="30"
              width="30"
              alt="Avatar"
              referrerPolicy="no-referrer"
             src={seller?.imageUrl ? seller.imageUrl : "https://lh3.googleusercontent.com/a/ACg8ocKUMU3XIX-JSUB80Gj_bYIWfYudpibgdwZE1xqmAGxHASgdvCZZ=s96-c"}
            />
          </div>
          <hr className="my-6" />
          <div>
            <p
              className="
                gap-4 
                font-light
                text-neutral-500
              "
            >
              Quantity: {quantity}
            </p>
          </div>
          <hr className="my-6" />
          <div className="flex justify-between">
            <p className="font-bold text-3xl text-gray-500">Price: {price}</p>
            <div>
              <Button disabled={!user || user.email === seller.email } onClick={() => setIsOpen(true)} label={user?"Purchase":'Login to Purchase'} />
            </div>
          </div>
          <hr className="my-6" />

          <PurchaseModal closeModal={closeModal}  plant={plant} isOpen={isOpen} />
        </div>
      </div>
    </Container>
  );
};

export default PlantDetails;
