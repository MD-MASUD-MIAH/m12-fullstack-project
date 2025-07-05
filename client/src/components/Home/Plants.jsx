import Container from "../Shared/Container";
import Card from "./Card";

const Plants = ({ plant }) => {
  return (
    <Container>
      <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
       {
        plant?.map(plant=> <Card key={plant._id} plant={plant} />)
       }
      </div>
    </Container>
  );
};

export default Plants;
