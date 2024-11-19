import { Ad, useGetAllAdsQuery } from '../generated/graphql-types';
import AdCard from './AdCard';

const RecentAds = () => {
   const { loading, error, data } = useGetAllAdsQuery();
   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error : {error.message}</p>;
   if (data) {
      return (
         <>
            <h2>Annonces récentes</h2>
            <section className="recent-ads">
               {data.getAllAds.map((ad: Ad) => {
                  return (
                     <div key={ad.id}>
                        <AdCard 
                           id={ad.id}
                           title={ad.title}
                           owner={ad.owner}
                           description={ad.description}
                           pictures={ad.pictures}
                           category={ad.category}
                           location={ad.location}
                           price={ad.price}
                           createdAt={ad.createdAt}
                           tags={ad.tags}
                        />
                     </div>
                  )
               }
               )}
            </section>
         </>
      );
   }
};

export default RecentAds;