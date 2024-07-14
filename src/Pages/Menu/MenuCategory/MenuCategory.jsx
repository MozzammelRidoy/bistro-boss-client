import { Link } from "react-router-dom";
import Cover from "../../Home/Shared/Cover/Cover";
import MenuItem from "../../Home/Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title, subTitle, image }) => {
  return (
    <section className="my-10">
     { title && <Cover
        image={image}
        title={title}
        subTitle={subTitle}
      ></Cover>}

      <div className="grid md:grid-cols-2 gap-4">
        {items.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>

     <Link to={`/order/${title}`}>
     <button className="btn flex  mt-2 uppercase  btn-outline border-0 border-b-2 border-black mx-auto">ORDER YOUR FAVOURITE FOOD</button>
     </Link>
    </section>
  );
};

export default MenuCategory;
