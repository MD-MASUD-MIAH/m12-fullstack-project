import { useLoaderData } from "react-router";
import Plants from "../../components/Home/Plants";
import EmptyState from "../../components/Shared/EmptyState";

const Home = () => {
  const plant = useLoaderData();
  console.log(plant);

  return (
    <div>
    {

      plant && plant.length > 0?   <Plants plant={plant} />: <EmptyState message={'No Plant Data Available Right now'}></EmptyState>
    }
    </div>
  );
};

export default Home;
