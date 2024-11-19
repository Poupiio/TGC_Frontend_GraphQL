import { useQuery } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GET_AD_BY_ID, GET_ALL_ADS } from "../graphql/queries";
import Tag from "../components/Tag";
import { useRemoveAdMutation } from "../generated/graphql-types";


const AdDetails = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   
   const { loading, error, data } = useQuery(GET_AD_BY_ID, {
      variables: { getAdByIdId: parseFloat(id!) }
   });
   const [deleteAdById] = useRemoveAdMutation({
      variables: { removeAdId: parseInt(id as string) }
   });

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error : {error.message}</p>;

   const handleDelete = async () => {
      await deleteAdById({
         // Recharger les ads au retour sur la page RecentAds
         refetchQueries: [GET_ALL_ADS],
         // Option du refetch pour éviter le petit temps de latence entre la suppression et le rechargement
         awaitRefetchQueries: true,
      });
      navigate("/");
   };

   return (
      <>
         <section className="ad-details">
            <div className="ad-details-image-container">
               <img className="ad-details-image" src={data.getAdById.pictures[0]?.url} key={data.getAdById.pictures[0]?.id} />
            </div>
            <h2 className="ad-details-title">{data.getAdById.title}</h2>
            <div className="ad-card-category">
               <p>{data.getAdById.category.name}</p>
            </div>
            <div className="ad-card-tag">
               {data.getAdById.tags.map((tag: any) => (
                  <Tag id={tag.id} name={tag.name} key={tag.id} />
               ))}
            </div>
            <div className="ad-details-info">
               <div className="ad-details-price">{data.getAdById.price} €</div>
               <div className="ad-details-description">
                  <h3>Description</h3>
                  <p>{data.getAdById.description}</p>
               </div>
               <div className="ad-details-location">
                  <i className="fa-solid fa-location-dot"></i>{data.getAdById.location}</div>
               <hr className="separator" />
               <div className="ad-details-owner">
                  Annoncée publiée par <b>{data.getAdById.owner}</b>, le {data.getAdById.createdAt && new Date(data.getAdById.createdAt).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                     })}.
               </div>
               <a href={`mailto:${data.getAdById.owner}`} className="button button-primary link-button mailBtn">
                  <i className="fa-regular fa-envelope"></i>Envoyer un email
               </a>
            </div>
            <div className="ad-call-to-actions">
               <Link to={`/ad/edit/${id}`} className="button ad-card-update">Modifier</Link>
               <button className="button ad-card-delete" onClick={handleDelete}>Supprimer</button>
            </div>
         </section>
      </>
   );
};

export default AdDetails;