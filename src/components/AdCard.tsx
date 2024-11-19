import { Link, useNavigate } from "react-router-dom";
import Tag from "./Tag";
import { Ad, useRemoveAdMutation } from "../generated/graphql-types";
import { GET_ALL_ADS } from "../graphql/queries";


const AdCard = ({ id, title, pictures, category, price, tags }: Ad) => {
   const navigate = useNavigate();

   const goToAdDetails = () => {
      navigate(`/ad/${id}`);
   };
   
   const [deleteAdById] = useRemoveAdMutation({
      variables: { removeAdId: id }
   });

   const handleDelete = async () => {
      await deleteAdById({
         refetchQueries: [GET_ALL_ADS],
         awaitRefetchQueries: true,
      });
      navigate("/");
   };

   return (
      <div className="ad-card-container">
         <div className="ad-card-image-container">
            <img className="ad-card-image" src={pictures?.[0]?.url} />
         </div>
         <div className="ad-card-text" onClick={goToAdDetails}>
            <div className="ad-card-title">{title}</div>
            <div className="ad-card-price">{price} €</div>
         </div>
         <div className="ad-card-content">
            <div className="ad-card-category">
               <p>{category.name}</p>
            </div>
            <div className="ad-card-tag">
               {tags?.map((tag) => (
                  <Tag id={tag.id} name={tag.name} key={tag.id} />
               ))}
            </div>
            <Link to={`ad/edit/${id}`} className="button ad-card-update">Modifier</Link>
            <button className="button ad-card-delete" onClick={handleDelete}>Supprimer</button>
         </div>
      </div>
   );
};

export default AdCard;