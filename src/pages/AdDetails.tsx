import { useState } from "react";
import { useParams } from "react-router-dom";
import { AdCardProps } from "../components/AdCard";

const AdDetails = () => {
   const { id } = useParams();
   const [ad, setAd] = useState({} as AdCardProps);

   return (
      <>
         <section className="ad-details">
            <div className="ad-details-image-container">
               <img className="ad-details-image" src={ad.picture} />
            </div>
            <h2 className="ad-details-title">{ad.title}</h2>
            <div className="ad-details-info">
               <div className="ad-details-price">{ad.price} €</div>
               <div className="ad-details-description">
                  <h5>Description</h5>
                  <p>{ad.description}</p>
               </div>
               <div className="ad-details-location">
                  <i className="fa-solid fa-location-dot"></i>{ad.location}</div>
               <hr className="separator" />
               <div className="ad-details-owner">
                  Annoncée publiée par <b>{ad.owner}</b>, le {ad.createdAt && new Date(ad.createdAt).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                     })}.
               </div>
               <a href={`mailto:${ad.owner}`} className="button button-primary link-button mailBtn">
                  <i className="fa-regular fa-envelope"></i>Envoyer un email
               </a>
            </div>
         </section>
      </>
   );
};

export default AdDetails;