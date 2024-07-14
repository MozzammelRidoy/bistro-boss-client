import FoodCard from "../../../Component/FoodCard/FoodCard";

const OrderTab = ({items}) => {
    return (
        <div className="grid grid-cols-3 gap-10">
            {
                items.map(item => <FoodCard key={item._id} items={item}></FoodCard>)
            }
        </div>
    );
};

export default OrderTab;