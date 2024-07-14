const MenuItem = ({ item }) => {
  const { name, price, image, recipe } = item;
  return (
    <div className="flex space-x-4 items-center p-4 ">
      <div>
        <img className="w-[120px]" style={{borderRadius : '0 200px 200px 200px'}} src={image} alt="" />
      </div>
      <div className="text-wrap">
        <h3 className="uppercase">{name}--------------</h3>
        <p>{recipe}</p>
      </div>
      <div>
        <p className="text-yellow-500 text-nowrap text-xl font-bold"> $ {price}</p>
      </div>
    </div>
  );
};

export default MenuItem;
