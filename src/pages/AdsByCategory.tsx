// import { useState } from "react";
import { useParams } from "react-router-dom";
// import AdCard, { AdCardProps } from "../components/AdCard";

const AdsByCategory = () => {
   const { name } = useParams();
   // const [ads, setAds] = useState<AdCardProps[]>([]);

   return (
      <>
         <p>Annonces disponibles pour la catégorie "{name}"</p>
         <section className="recent-ads">
            {/* {ads.map((ad) => (
               <div key={ad.id}>
                  <AdCard
                     id={ad.id}
                     title={ad.title}
                     owner={ad.owner}
                     description={ad.description}
                     picture={ad.picture}
                     location={ad.location}
                     price={ad.price}
                     createdAt={ad.createdAt}
                     category={ad.category}
                     tags={ad.tags}
                  />
               </div>
            ))} */}
         </section>
      </>
   );
};

export default AdsByCategory;