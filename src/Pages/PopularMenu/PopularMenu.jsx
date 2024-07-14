import SectionTile from "../../Component/SectionTitle/SectionTile";
import MenuItem from "../Home/Shared/MenuItem/MenuItem";
import useMenu from "../../hooks/useMenu";

const PopularMenu = () => {
  const [menu] = useMenu();
  const popularMenu = menu.filter(item => item.category === 'popular'); 

  // const [menu, setMenu] = useState([]);

  // useEffect(() => {
  //   fetch("/menu.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const popularItems = data.filter(item => item.category === 'popular');
  //       setMenu(popularItems)});
  // }, []);

  return (
    <section className="mb-12">
      <SectionTile heading={"From Our Menu"} subHeading={"Popular Items"} />

      <div className="grid md:grid-cols-2 gap-4">

        {
            popularMenu.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
        }
      </div>

      <button className="btn flex  mt-2 uppercase  btn-outline border-0 border-b-2 border-black mx-auto">View Full Menu</button>

    </section>
  );
};

export default PopularMenu;
