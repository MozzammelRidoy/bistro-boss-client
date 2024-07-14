import { useForm } from "react-hook-form";
import SectionTile from "../../../Component/SectionTitle/SectionTile";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUtensils } from "react-icons/fa";

import Swal from "sweetalert2";


const AddItems = () => {
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY; 
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`; 


    const axiosPublic = useAxiosPublic(); 
    const axiosSecure = useAxiosSecure(); 



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) =>{
    //   console.log(data)
      const imgFile = {image : data.image[0]};
    //   console.log(imgFile);

      const res = await axiosPublic.post(image_hosting_api, imgFile, {
        headers : { "content-type": "multipart/form-data"}
      })
     


      if(res.data.success){
        const menuItem = {name : data.name, category : data.category, price : parseFloat(data.price), recipe : data.recipe, image : res.data.data.display_url}; 

        const menuRes = await axiosSecure.post('/menu', menuItem)
        // console.log(menuRes.data); 
        reset();
        if(menuRes.data.insertedId){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Add item Success !",
                showConfirmButton: false,
                iconColor: "green",
                timer: 1500,
              });
        }
        
      }
      
    
    
    


};

  return (
    <section>
      <SectionTile subHeading={"What's new"} heading={"ADD AN ITEM"} />

      <div className="max-w-4xl card-body mx-auto  bg-slate-100">
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-span-2">
            <label htmlFor="name">Recipe Name*</label>
            <input
              {...register("name")}
              className="w-full input mt-2 input-bordered"
              type="text"
              placeholder="Recipe Name"
            />
          </div>
          <div className="">
            <label htmlFor="category">Category*</label>
            <select defaultValue={'default'}
              {...register("category")}
              className="select select-bordered w-full  mt-2 block"
            >
              <option value={'default'} disabled>
                Category
              </option>
              <option value={'salad'}>Salad</option>
              <option value={'dessert'}>Dessert</option>
              <option value={'pizza'}>Pizza</option>
              <option value={'drinks'}>Drinks</option>
              <option value={'soup'}>Soup</option>
              <option value={'popular'}>Soup</option>
              <option value={'offered'}>Soup</option>
            </select>
          </div>
          <div className="">
            <label htmlFor="price">Price*</label>
            <input
              {...register("price")}
              className="w-full input mt-2 input-bordered"
              type="text"
              placeholder="price"
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="recipeDetails">Recipe Details*</label>
            <textarea {...register("recipe")}
              placeholder="recipe details"
              className="textarea block textarea-bordered textarea-md w-full"
            ></textarea>
          </div>
          <div>
          <input {...register("image")} type="file" className="file-input w-full outline-none max-w-xs" />
          </div>
          <div className="col-span-2">
            <button  className=" bg-gradient-to-r from-[#835D23] to-[#B58130] btn text-white hover:bg-gradient-to-t hover:from-[#B58130] hover:to-[#835D23] px-8" id="">Add Item <FaUtensils /> </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddItems;
