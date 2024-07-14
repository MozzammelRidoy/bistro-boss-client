
const SectionTile = ({heading, subHeading}) => {
    return (
        <div className="mx-auto text-center w-4/12 my-8">
 
            <p className="text-yellow-600 mb-2 text-xl">---{subHeading}---</p>  
            <h3 className="text-5xl uppercase border-y-4 py-4">{heading}</h3>          
        </div>
    );
};

export default SectionTile;