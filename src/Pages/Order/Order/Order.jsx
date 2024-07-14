import Cover from "../../Home/Shared/Cover/Cover";
import orderImage from "../../../assets/shop/banner2.jpg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState } from "react";
import useMenu from "../../../hooks/useMenu";
import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const Order = () => {
    const [menu] = useMenu();
    const {category} = useParams(); 
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']; 
    const initialIndex = categories.indexOf(category); 
    const [tabIndex, setTabIndex] = useState(initialIndex);
  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const drinks = menu.filter((item) => item.category === "drinks");
//   console.log(menu);
  return (
    <section>
        <Helmet>
            <title>Bistro Boss | Order Food</title>
        </Helmet>
      <Cover
        image={orderImage}
        title={"Order Food"}
        subTitle={
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam voluptatibus sint nobis modi et voluptatem repellat accusantium aliquid placeat deleniti."
        }
      />
      <div className="my-10 max-w-6xl mx-auto">
        <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList className={"uppercase text-center mb-10"}>
            <Tab>Salad</Tab>
            <Tab>Pizza</Tab>
            <Tab>Soups</Tab>
            <Tab>Desserts</Tab>
            <Tab>Drinks</Tab>
          </TabList>
          <TabPanel>
            <OrderTab items={salad} />
          </TabPanel>
          <TabPanel>
            <OrderTab items={pizza} />
          </TabPanel>
          <TabPanel>
            <OrderTab items={soup} />
          </TabPanel>
          <TabPanel>
            <OrderTab items={dessert} />
          </TabPanel>
          <TabPanel>
            <OrderTab items={drinks} />
          </TabPanel>
        </Tabs>
      </div>
    </section>
  );
};

export default Order;
