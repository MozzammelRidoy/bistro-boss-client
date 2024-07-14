import { Parallax } from "react-parallax";

const Cover = ({ image, title, subTitle }) => {
  return (
    
      <Parallax
        blur={{ min: -50, max: 50 }}
        bgImage={image}
        bgImageAlt={title}
        strength={-200}
      >
        <div
          className="hero h-[600px]"
        >
          <div className="hero-overlay bg-opacity-50"></div>
          <div className="w-3/4 mx-auto text-neutral-content  text-center">
            <div className="bg-black p-10 bg-opacity-50">
              <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
              <p className="">{subTitle}</p>
            </div>
          </div>
        </div>
      </Parallax>
   
  );
};

export default Cover;
