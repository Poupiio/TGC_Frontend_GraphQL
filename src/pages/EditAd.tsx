import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@apollo/client";
import { GET_AD_BY_ID, GET_ALL_CATEGORIES_AND_TAGS } from "../graphql/queries";
import { UPDATE_AD } from "../graphql/mutations";
import { Category, Tag } from "../generated/graphql-types";


type FormValues = {
   title: string
   description: string,
   category: number,
   price: number,
   pictures: string[],
   location: string,
   tags: number[],
}

const EditAd = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   
   const { loading, error, data } = useQuery(GET_AD_BY_ID, {
      variables: { getAdByIdId: parseFloat(id!) }
   });
   const { loading: loadingCategoriesAndTags, error: errorCategoriesAndTags, data: getAllCategoriesAndTags } = useQuery(GET_ALL_CATEGORIES_AND_TAGS);
   const [udateAd] = useMutation(UPDATE_AD);

   
   const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({defaultValues: {
      title: data.getAdById.title,
      description: data.getAdById.description,
      category: data.getAdById.category.name,
      price: data.getAdById.price,
      pictures: data.getAdById.pictures[0]?.url,
      location: data.getAdById.location,
   }});

   if (loading || loadingCategoriesAndTags) return <p>Loading...</p>;
   if (error || errorCategoriesAndTags) return <p>Error: {error?.message || errorCategoriesAndTags?.message}</p>;
   
   const onSubmit: SubmitHandler<FormValues> = async (formData) => {
      
      try {
         console.log(formData);
         await udateAd({
            variables: {
               data: {
                  title: formData.title,
                  description: formData.description,
                  category: formData.category,
                  price: Number(formData.price),
                  pictures: formData.pictures,
                  location: formData.location,
                  tags: formData.tags.map((tagId) => ({
                     id: tagId
                  }))
               },
            },
         });
         toast.success("Ad has been updated");
         
         navigate("/");
      } catch (error) {
         console.error("Erreur lors de la création de l'annonce :", error, errors);
      }
   }

   return (
      <>
         <h1>Modifier {data.getAdById.title}</h1>
         <form className="form" method="post" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="title">Titre de l'annonce
               <input className="text-field" type="text" {...register("title", { required: true })} placeholder="Titre de l'annonce" defaultValue={data.getAdById.title} />
            </label>
            
            <label htmlFor="description">Description
               <textarea className="text-field" {...register("description")} id="description" placeholder="Description..." defaultValue={data.getAdById.description}></textarea>
            </label>
            
            <select className="text-field" {...register("category", { required: true })} id="category">
            <option value="">Choisissez une catégorie</option>
            {getAllCategoriesAndTags.getAllCategories.map((category: Category) => (
               <option value={category.id} key={category.id}>{category.name}</option>
            ))}
         </select>
            
            <label htmlFor="price">Prix
               <input className="text-field" type="number" {...register("price", { required: true })} min="0" defaultValue={data.getAdById.price} />
            </label>
            
            <label htmlFor="picture">Entrez l'URL de votre image
               <input className="text-field" type="text" {...register("pictures", { required: true })} maxLength={2000} defaultValue={data.getAdById.picture} />
            </label>

            <label htmlFor="location">Localisation
               <input className="text-field" type="text" {...register("location", { required: true })} placeholder="Paris" defaultValue={data.getAdById.location} />
            </label>

            <div className="checkbox-container">
               {getAllCategoriesAndTags.getAllTags.map((tag: Tag) => (
                  <label key={tag.id} htmlFor={`${tag.id}`}>
                     <input className="checkbox" type="checkbox" id={`${tag.id}`} value={tag.id} {...register("tags")} />{tag.name}
                  </label>
               ))}
            </div>

            <button className="button" type="submit">Modifier</button>
         </form>
      </>
   );
};

export default EditAd;