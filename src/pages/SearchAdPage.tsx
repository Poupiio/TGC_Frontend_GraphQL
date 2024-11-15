// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import AdCard, { AdCardProps } from "../components/AdCard";

// const SearchAdPage = () => {

//    const { keyword } = useParams();
//    const [ads, setAds] = useState<AdCardProps[]>([]);

//    useEffect(() => {
//       const fetchAdsForKeyword = async () => {
//          const result = await axios.get(`http://localhost:3000/ads?title=${keyword}`);
//          setAds(result.data)
//       }
//       fetchAdsForKeyword();
//    }, [keyword]);

//    return (
//       <>
//          <p>Résultats correspondants à votre recherche "{keyword}"</p>
//          <section className="recent-ads">
//             {ads.map((ad) => (
//                <div key={ad.id}>
//                   <AdCard
//                      id={ad.id}
//                      title={ad.title}
//                      owner={ad.owner}
//                      description={ad.description}
//                      picture={ad.picture}
//                      location={ad.location}
//                      price={ad.price}
//                      createdAt={ad.createdAt}
//                      category={ad.category}
//                   />
//                </div>
//             ))}
//          </section>
//       </>
//    );
// };

// export default SearchAdPage;