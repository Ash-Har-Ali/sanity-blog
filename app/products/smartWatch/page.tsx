import ProductPage from "../ProductPage";
import banner from "../../../public/images/banner-ac.svg"; // Television banner image

const TelevisionPage: React.FC = () => {
  return <ProductPage category="smartwatch" bannerImage={banner} />;
};

export default TelevisionPage;
