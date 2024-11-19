import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"
import { toast } from "react-toastify";
import { Category, Tag, useCreateNewAdMutation, useGetAllCategoriesAndTagsQuery } from '../generated/graphql-types';
import { GET_ALL_ADS } from '../graphql/queries';

export type FormValues = {
   title: string
   description: string,
   category: string,
   price: string,
   pictures: { url: string }[],
   location: string,
   tags: string[],
   owner: string
}

const CreateAd = () => {
   const navigate = useNavigate();

   // Utilisation du hook généré : data est directement typé, qui contient getAllCategories et getAllTags
   const { loading, error, data } = useGetAllCategoriesAndTagsQuery();
   const [createNewAd] = useCreateNewAdMutation({ 
      refetchQueries: [GET_ALL_ADS]
   });

   const { register, handleSubmit, control, formState: { errors }  } = useForm<FormValues>({defaultValues: {
      title: "Titre de mon annonce",
      description: "Description de mon annonce",
      category: "6",
      price: "10",
      pictures: [
         {
            url: "https://picsum.photos/200"
         },
      ],
      location: "Ma ville",
      owner: "C'est moi"
   }});

   const { fields, append, remove } = useFieldArray({
      control,
      name: "pictures",
   });
   
   const onSubmit: SubmitHandler<FormValues> = async (formData) => {
      try {
         console.log("data from react hook form", formData);
         const dataForBackend = {
            ...formData,
            price: parseInt(formData.price),
            tags: formData.tags ? formData.tags.map((tagID) => ({ id: parseInt(tagID) })) : []
         };
         await createNewAd({
            variables: { data: dataForBackend }
         });

         toast.success("Annonce créée avec succès !");
         navigate("/");
      } catch (err) {
         console.error("Erreur lors de la création de l'annonce :", errors, err);
         toast.error("Une erreur est survenue !");
      }
   
   }

   if (loading) return 'Submitting...';
   if (error) return <p>Error: {error.message}</p>;

   if (data) {
      return (
         <form
            method="post"
            className="form"
            onSubmit={handleSubmit(onSubmit)}
         >
            <label htmlFor="title">Quel est le titre de votre annonce ?
               <input className="text-field" type="text" {...register("title", { required: "Le titre est obligatoire" })} placeholder="Titre de l'annonce" />
            </label>
            
            <label htmlFor="description">Description
               <textarea className="text-field" {...register("description")} id="description" placeholder="Description..."></textarea>
            </label>
            
            <select className="text-field" {...register("category", { required: true })} id="category">
               <option value="">Choisissez une catégorie</option>
               {data.getAllCategories.map((category: Category) => (
                  <option value={category.id} key={category.id}>{category.name}</option>
               ))}
            </select>
            
            <label htmlFor="price">Prix
               <input className="text-field" type="number" {...register("price", { required: true })} min="0" />
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
               <input className="text-field" type="text" {...register("location", { required: true })} placeholder="Paris" />
            </label>
            
            <h4>Souhaitez-vous ajouter un ou plusieurs tag(s) ?</h4>
            <div className="checkbox-container">
               {data.getAllTags.map((tag: Tag) => (
                  <label key={tag.id} htmlFor={`${tag.id}`}>
                     <input className="checkbox" type="checkbox" id={`${tag.id}`} value={tag.id} {...register("tags")} />{tag.name}
                  </label>
               ))}
            </div>

            <label htmlFor="owner">Vendeur
               <input className="text-field" type="text" {...register("owner", { required: true })} placeholder="Votre nom" />
            </label>
            
            <button className="button create-ad" type="submit">Créer</button>
         </form>
      );
   }
};

export default CreateAd;