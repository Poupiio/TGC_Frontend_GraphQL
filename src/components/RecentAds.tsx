import { useQuery } from '@apollo/client';
import AdCard from './AdCard';
import { GET_ALL_ADS } from '../graphql/queries';

const RecentAds = () => {
   const { loading, error, data } = useQuery(GET_ALL_ADS);
   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error : {error.message}</p>;

   return (
      <>
         <h2>Annonces récentes</h2>
         <section className="recent-ads">
            {data.getAllAds.map((ad: any) => (
               <div key={ad.id}>
                  <AdCard 
                     id={ad.id}
                     title={ad.title}
                     owner={ad.owner}
                     description={ad.description}
                     picture={ad.pictures[0]?.url}
                     category={ad.category}
                     location={ad.location}
                     price={ad.price}
                     createdAt={ad.createdAt}
                     tags={ad.tags}
                  />
               </div>
            ))}
         </section>
      </>
   );
};

export default RecentAds;