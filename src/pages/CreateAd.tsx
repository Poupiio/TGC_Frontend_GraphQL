import { gql, useMutation, useQuery } from '@apollo/client';
import { CategoryProps } from "../components/Category";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"
import { toast } from "react-toastify";

export type FormValues = {
   title: string
   description: string,
   category: number,
   price: number,
   picturesUrl: string[],
   location: string,
   // tags: number[],
   owner: string,
   createdAt: Date
}

const CREATE_AD = gql`
   mutation Mutation($data: AdInput!) {
      createNewAd(data: $data) {
         id
      }
   }
`;

const GET_ALL_CATEGORIES = gql`
   query GetAllCategories {
      getAllCategories {
         name
         id
      }
   }
`;

const CreateAd = () => {
   const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
   
   const { loading, error, data: getAllCategoriesData } = useQuery(GET_ALL_CATEGORIES);

   const [createNewAd] = useMutation(CREATE_AD);
   if (loading) return 'Submitting...';
   if (error) return `Submission error! ${error.message}`;

   const navigate = useNavigate();

   const onSubmit: SubmitHandler<FormValues> = async (formData) => {
      try {
         await createNewAd({
            variables: {
               data: {
                  title: formData.title,
                  description: formData.description,
                  category: formData.category,
                  price: Number(formData.price),
                  picturesUrl: [formData.picturesUrl],
                  location: formData.location,
                  owner: formData.owner,
                  createdAt: formData.createdAt + "T00:00:00.000Z",
               },
            },
         });

         toast.success("Annonce créée avec succès !");
         navigate("/");
      } catch (err) {
         console.error("Error creating ad:", err);
         toast.error("Une erreur est survenue !");
      }
   
   }

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
            {getAllCategoriesData.getAllCategories.map((category: any) => (
               <option value={category.id} key={category.id}>{category.name}</option>
            ))}
         </select>
         
         <label htmlFor="price">Prix
            <input className="text-field" type="number" {...register("price", { required: true })} min="0" />
         </label>
         
         <label htmlFor="pictures">Entrez l'URL de votre image
            <input className="text-field" type="text" {...register("picturesUrl", {
               required: true,
               maxLength: { value: 2000, message: "Maximum 2000 characters" },
               })}
            />
         </label>

         <label htmlFor="location">Localisation
            <input className="text-field" type="text" {...register("location", { required: true })} placeholder="Paris" />
         </label>
         
         {/* <h4>Souhaitez-vous ajouter un ou plusieurs tag(s) ?</h4>
         <div className="checkbox-container">
            {tags.map(tag => (
               <label htmlFor={`${tag.id}`}>
                  <input className="checkbox" type="checkbox" id={`${tag.id}`} value={tag.id} {...register("tags")} />{tag.name}
               </label>
            ))}
         </div> */}

         <label htmlFor="owner">Vendeur
            <input className="text-field" type="text" {...register("owner", { required: true })} placeholder="Votre nom" />
         </label>

         <label htmlFor="createdAt">Date d'ajout
            <input className="text-field" type="date" {...register("createdAt")} />
         </label>

         <button className="button create-ad" type="submit">Créer</button>
      </form>
   );
};

export default CreateAd;