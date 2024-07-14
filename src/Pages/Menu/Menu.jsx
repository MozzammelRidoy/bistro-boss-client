import { Helmet } from "react-helmet";
import Cover from "../Home/Shared/Cover/Cover";
import menuBgImage from '../../assets/menu/banner3.jpg';  
import useMenu from "../../hooks/useMenu";
import SectionTile from "../../Component/SectionTitle/SectionTile";
import MenuCategory from "./MenuCategory/MenuCategory";
import dessertImage from '../../assets/menu/dessert-bg.jpeg';
import pizzaImage from '../../assets/menu/pizza-bg.jpg';
import saladsImage from '../../assets/menu/salad-bg.jpg';
import soupImage from '../../assets/menu/soup-bg.jpg';

const Menu = () => {
    const [menu] = useMenu(); 
    const dessert = menu.filter(item => item.category === 'dessert'); 
    const soup = menu.filter(item => item.category === 'soup'); 
    const salad = menu.filter(item => item.category === 'salad'); 
    const pizza = menu.filter(item => item.category === 'pizza'); 
    const offered = menu.filter(item => item.category === 'offered'); 
    
    return (
        <section>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover image={menuBgImage} title={'OUR MENU'} subTitle={'Would you like to try a dish?'}></Cover>

            {/* offered items */}
            <SectionTile subHeading={"Don't miss"} heading={"TODAY'S OFFER"}/>
            <MenuCategory items={offered}/>

            {/* dessert items  */}
            <MenuCategory items={dessert} title={'dessert'} subTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."} image={dessertImage} />


            {/* pizza items  */}
            <MenuCategory items={pizza} title={"pizza"} subTitle={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."} image={pizzaImage}/>

            {/* salads items  */}
            <MenuCategory items={salad} title={'salad'} subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} image={saladsImage}/>

            {/* soup items  */}

            <MenuCategory items={soup} title={'soup'} subTitle={'Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'} image={soupImage}/>
            
            
            
            

           
        </section>
    );
};

export default Menu;