const CardChef = ({ chef }) => {
  return (
    <div className=" bg-white p-8 rounded-2xl border border-brown-leon-600/20">
      <img
        className="rounded-full border-2 border-amber-200 mx-auto "
        src={chef.imageUrl}
        alt={`Portrait of ${chef.name}`}
      />
      <div className=" text-center pt-4">
        <h1 className="text-2xl font-bold text-dark-leon-400">{chef.name}</h1>
        <p className="text-gray-500">{chef.position}</p>
      </div>
    </div>
  );
};

export default CardChef;
