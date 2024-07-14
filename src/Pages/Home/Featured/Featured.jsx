import SectionTile from "../../../Component/SectionTitle/SectionTile";
import feturedImage from "../../../assets/home/featured.jpg";
import './Featured.css';

const Featured = () => {
  return (
    <section className="featuredBG text-white  bg-fixed bg-no-repeat bg-center ">
      <div className="p-20 my-20 bg-black bg-opacity-60">
      <SectionTile subHeading={"Check it Out"} heading={"Fetured Item"} />
      <div className="flex justify-center items-center py-8 px-16 gap-5 ">
        <div>
          <img src={feturedImage} alt="" />
        </div>
        <div>
          <p>March 20, 2023</p>
          <p className="uppercase">WHERE CAN I GET SOME?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur obcaecati quos veniam, quam quod inventore exercitationem delectus? Libero ullam odio dolor sit pariatur deserunt, quas molestiae velit possimus rerum qui eius odit ut cumque laboriosam accusamus, aspernatur consequatur sapiente quae? Architecto, accusamus facilis? Laboriosam cupiditate dolore illo, labore necessitatibus nobis!</p>

          <button className="btn mt-2 uppercase  btn-outline border-0 border-b-2 text-white">Read More</button>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Featured;
