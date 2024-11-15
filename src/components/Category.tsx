import { Link,  } from "react-router-dom";
export type CategoryProps = { id: number, name: string };

const Category = ({ name }: CategoryProps) => {
   const categoryMap: Record<string, string> = {
      "Équipement informatique": "equipement-informatique",
      "Décoration": "decoration",
      "Automobile": "automobile",
      "Vêtements": "vetements",
      "Autre": "autre",
      "Bébé": "bebe",
      "Vélos": "velos",
      "Vacances": "vacances",
      "Photographie": "photographie",
      "Services": "services",
      "Sport": "sports",
      "Téléphonie": "telephonie",
      "Outillage": "outillage",
      "Jeux video": "jeux-video",
   };
   const urlName = categoryMap[name] || name.toLowerCase()
      .replace(/\s+/g, '-')
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, '')
   ;

   return (
      <>
         <Link to={`ad/category/${urlName}`} className="category-navigation-link">{name}</Link>
      </>
   );
};

export default Category;