import { Link, useNavigate } from "react-router-dom";
// import Tag, { TagProps } from "./Tag";

export type AdCardProps = {
   id: number, 
   title: string,
   description: string,
   owner: string,
   picture: string,
   price: number,
   location: string,
   createdAt: Date,
   category: {
      id: number,
      name: string
   },
   // tags: TagProps[]
}

const AdCard = ({ id, title, picture, category, price }: AdCardProps) => {
   const navigate = useNavigate();
   
   const goToAdDetails = () => {
      navigate(`/ad/${id}`);
   };

   const handleDelete = async () => {
      console.log("Supprimé");
   };

   return (
      <div className="ad-card-container" onClick={goToAdDetails}>
         <div className="ad-card-image-container">
            <img className="ad-card-image" src={picture} />
         </div>
         <div className="ad-card-text">
            <div className="ad-card-title">{title}</div>
            <div className="ad-card-price">{price} €</div>
         </div>
         <div className="ad-card-content">
            <div className="ad-card-category">
               <p>{category.name}</p>
            </div>
            {/*<div className="ad-card-tag">
               {tags.map((tag) => (
                  <Tag id={tag.id} name={tag.name} key={tag.id} />
               ))}
            </div> */}
            <Link to={`ad/edit/${id}`} className="button ad-card-update">Modifier</Link>
            <button className="button ad-card-delete" onClick={handleDelete}>Supprimer</button>
         </div>
      </div>
   );
};

export default AdCard;