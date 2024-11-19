import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { GET_AD_BY_ID, GET_ALL_CATEGORIES_AND_TAGS } from "../graphql/queries";
import { Category, Tag, useGetAdByIdAndAllCategoriesAndTagsQuery, useUpdateAdMutation } from "../generated/graphql-types";


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
   
   const { loading, error, data } = useGetAdByIdAndAllCategoriesAndTagsQuery({
      variables: { getAdByIdId: parseInt(id as string) }
   });

   const [updateAd] = useUpdateAdMutation();

   const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>({defaultValues: {
      title: data?.getAdById.title,
      description: data?.getAdById.description,
      // category: data?.getAdById.category.name,
      price: data?.getAdById.price,
      pictures: data?.getAdById.pictures?.url,
      location: data?.getAdById.location,
   }});

   const { fields, append, remove } = useFieldArray({
      control,
      name: "pictures",
   });

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error: {error?.message}</p>;
   
   const onSubmit: SubmitHandler<FormValues> = async (formData) => {
      console.log("coucou");
      
      try {
         console.log(formData);
      //    await updateAd({
      //       variables: {
      //          data: {
      //             title: formData.title,
      //             description: formData.description,
      //             category: formData.category,
      //             price: Number(formData.price),
      //             pictures: formData.pictures,
      //             location: formData.location,
      //             tags: formData.tags.map((tagId) => ({
      //                id: tagId
      //             }))
      //          },
      //       },
      //    });
      //    toast.success("Ad has been updated");
         
      //    navigate("/");
      } catch (error) {
         console.error("Erreur lors de la création de l'annonce :", error, errors);
      }
   }

   if (data) {
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
               
               <select className="text-field" {...register("category", { required: true })} id="category" defaultValue={data.getAdById.category.name}>
                  {data.getAllCategories.map((category: Category) => (
                     <option value={category.name} key={category.id}>{category.name}</option>
                  ))}
               </select>
               
               <label htmlFor="price">Prix
                  <input className="text-field" type="number" {...register("price", { required: true })} min="0" defaultValue={data.getAdById.price} />
               </label>
               
               <div className="images-container">
                  <label htmlFor="pictures">Souhaitez-vous ajouter des images ?</label>
                  <button className="button add-image" type="button" onClick={() => append({ url: "" })}>Ajouter</button>
                  <div className="field">
                     {fields.map((field, index) => {
                        return (
                           <div key={field.id}>
                              <section className="image-input-and-remove">
                                 <input
                                    className="text-field"
                                    placeholder="Entrez l'URL de votre image"
                                    {...register(`pictures.${index}.url` as const)}
                                 />
                                 <button className="button" onClick={() => remove(index)}>Supprimer</button>
                              </section>
                              <span>{errors.pictures?.[index]?.url?.message}</span>
                           </div>
                        );
                     })}
                  </div>
               </div>

               <label htmlFor="location">Localisation
                  <input className="text-field" type="text" {...register("location", { required: true })} placeholder="Paris" defaultValue={data.getAdById.location} />
               </label>

               <div className="checkbox-container">
                  {data.getAllTags.map((tag: Tag) => (
                     <label key={tag.id} htmlFor={`${tag.id}`}>
                        <input className="checkbox" type="checkbox" id={`${tag.id}`} value={tag.id} {...register("tags")} />{tag.name}
                     </label>
                  ))}
               </div>

               <button className="button" type="submit">Modifier</button>
            </form>
         </>
      );
   }
};

export default EditAd;