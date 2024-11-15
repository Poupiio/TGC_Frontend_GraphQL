import { Route, Routes } from "react-router-dom";
import RecentAds from "./components/RecentAds";
import Layout from "./pages/Layout";
import About from "./pages/About";
import AdDetails from "./pages/AdDetails";
// import Furnishings from "./pages/Furnishings";
// import ElectricalAppliances from "./pages/ElectricalAppliances";
// import Photography from "./pages/Photography";
// import Computing from "./pages/Computing";
// import Telephony from "./pages/Telephony";
// import Bikes from "./pages/Bikes";
// import Sport from "./pages/Sport";
// import Clothing from "./pages/Clothing";
// import Baby from "./pages/Baby";
// import Tools from "./pages/Tools";
// import Services from "./pages/Services";
// import Holidays from "./pages/Holidays";
// import Counter from "./pages/Counter";
// import CreateAd from "./pages/CreateAd";
// import CreateCategory from "./pages/CreateCategory";
// import EditAd from "./pages/EditAd";
// import SearchAdPage from "./pages/SearchAdPage";
// import AdsByCategory from "./pages/AdsByCategory";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import CategoryPage from "./pages/CategoryPage";
import CreateAd from "./pages/CreateAd";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<RecentAds />} />
					<Route path="about" element={<About />} />
					<Route path="ad/:id" element={<AdDetails />} />
					{/* <Route path="ad/search/:keyword" element={<SearchAdPage />} /> */}
					<Route path="ad/new" element={<CreateAd />} />
					{/*<Route path="ad/edit/:id" element={<EditAd />} />
					<Route path="category/new" element={<CreateCategory />} />
					 <Route path="category/furnishings" element={<Furnishings />} />
					<Route path="category/electrical-appliances" element={<ElectricalAppliances />} />
					<Route path="category/photography" element={<Photography />} />
					<Route path="category/computing" element={<Computing />} />
					<Route path="category/telephony" element={<Telephony />} />
					<Route path="category/bikes" element={<Bikes />} />
					<Route path="category/sport" element={<Sport />} />
					<Route path="category/clothing" element={<Clothing />} />
					<Route path="category/baby" element={<Baby />} />
					<Route path="category/tools" element={<Tools />} />
					<Route path="category/services" element={<Services />} />
					<Route path="category/holidays" element={<Holidays />} />
					<Route path="counter" element={<Counter />} />
					<Route path="ad/category/:name" element={<AdsByCategory />} /> */}
					<Route path="/ad/category/:categoryName" element={<CategoryPage />} />
				</Route>
			</Routes>
			<ToastContainer theme="colored" />
		</>
	);
}

export default App;
