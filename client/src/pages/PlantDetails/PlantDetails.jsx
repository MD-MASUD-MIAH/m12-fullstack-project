import {  useState } from "react";
import {   useParams } from "react-router";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import Button from "../../components/Shared/Button/Button";
import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import useAuth from "../../hooks/useAuth";
import { useRole } from "../../hooks/useRole";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const PlantDetails = () => {
 
  const [role,isRoleLoading] = useRole()
  const {id} = useParams()
 
  const {
    data: plant,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['plant', id],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/plant/${id}`
      )
      return data
    },
  })

const {user} = useAuth()
  const { name, image, category, quantity, price, seller, } = plant || {}
 

console.log(id,role);

   
  const closeModal = () => {
    setIsOpen(false);
  };


  
 const [isOpen, setIsOpen] = useState(false); 
  if(isRoleLoading  || isLoading) return <LoadingSpinner></LoadingSpinner> 

  
  
  

  console.log('ki re',plant);
  

 
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
              <Button disabled={!user || user.email === seller.email || role !== 'customer' } onClick={() => setIsOpen(true)} label={user?"Purchase":'Login to Purchase'} />
            </div>
          </div>
          <hr className="my-6" />

          <PurchaseModal closeModal={closeModal}   fetchPlant={refetch}  plant={plant} isOpen={isOpen} />
        </div>
      </div>
    </Container>
  );
};

export default PlantDetails;
