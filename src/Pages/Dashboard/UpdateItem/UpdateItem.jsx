import { useLoaderData } from "react-router-dom";
import SectionTile from "../../../Component/SectionTitle/SectionTile";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateItem = () => {
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const item = useLoaderData();
//   console.log(item);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { name, price, recipe, category, image, _id } = item;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    //   console.log(data)
    const imgFile = { image: data.image[0] };
    //   console.log('check image', imgFile);

    const res =  imgFile.image === undefined ? image : await axiosPublic.post(image_hosting_api, imgFile, {
      headers: { "content-type": "multipart/form-data" }
    })  ;

    // console.log(res);

    const menuItem = {
      name: data.name,
      category: data.category,
      price: parseFloat(data.price),
      recipe: data.recipe,
      image: res?.data?.success ? res.data.data.display_url : res,
    };

    const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
    // console.log(menuRes.data);
    reset();
    if (menuRes.data.modifiedCount > 0) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "item update Success !",
        showConfirmButton: false,
        iconColor: "green",
        timer: 1500,
      });
    }
  };

  return (
    <section>
      <SectionTile subHeading={"Refresh Info"} heading={"Update item"} />

      <div className="max-w-4xl card-body mx-auto  bg-slate-100">
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-span-2">
            <label htmlFor="name">Recipe Name*</label>
            <input
              defaultValue={name}
              {...register("name")}
              className="w-full input mt-2 input-bordered"
              type="text"
              placeholder="Recipe Name"
            />
          </div>
          <div className="">
            <label htmlFor="category">Category*</label>
            <select
              defaultValue={category}
              {...register("category")}
              className="select select-bordered w-full  mt-2 block"
            >
              <option value={category}>{category}</option>
              <option value={"salad"}>Salad</option>
              <option value={"dessert"}>Dessert</option>
              <option value={"pizza"}>Pizza</option>
              <option value={"drinks"}>Drinks</option>
              <option value={"soup"}>Soup</option>
              <option value={"popular"}>Soup</option>
              <option value={"offered"}>Offered</option>
            </select>
          </div>
          <div className="">
            <label htmlFor="price">Price*</label>
            <input
              defaultValue={price}
              {...register("price")}
              className="w-full input mt-2 input-bordered"
              type="text"
              placeholder="price"
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="recipeDetails">Recipe Details*</label>
            <textarea
              {...register("recipe")}
              defaultValue={recipe}
              placeholder="recipe details"
              className="textarea block textarea-bordered textarea-md w-full"
            ></textarea>
          </div>
          <div>
            <input
              {...register("image")}
              type="file"
              className="file-input w-full outline-none max-w-xs"
            />
          </div>
          <div className="col-span-2 text-center">
            <button
              className=" bg-gradient-to-r from-[#835D23] to-[#B58130] btn text-white hover:bg-gradient-to-t hover:from-[#B58130] hover:to-[#835D23] px-8"
              id=""
            >
              Update Recipe Details
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateItem;
