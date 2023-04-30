import {Container, Spinner} from 'react-bootstrap'
import SectionTitle from '../Utility/SectionTitle'
import HomeProductCard from '../Products/HomeProductCard'
import useProductsContainer from "../../hook/products/useProductsContainer";
import {A11y, Scrollbar} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

const HomeProducts = ({title, btnTitle, pathText, products, loading, error}) => {

    const {isFavProduct} = useProductsContainer()

    return (
        <Container>
            <SectionTitle title={title} btnTitle={btnTitle} pathText={pathText}/>
            {
                loading && !error && !products && <Spinner animation="border" variant="primary"/>
            }
            {
                !loading && !error && (products && products.length > 0) && (
                    <Swiper
                        modules={[Scrollbar, A11y]}
                        // navigation
                        scrollbar={{ draggable: true }}
                        breakpoints={{
                            "@0.00": {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            "@0.75": {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            "@1.00": {
                                slidesPerView: 3,
                                spaceBetween: 40,
                            },
                            "@1.50": {
                                slidesPerView: 4,
                                spaceBetween: 50,
                            },
                        }}
                        className="mySwiper"
                    >
                        {products?.map((product) => (
                            <SwiperSlide key={product?._id}>
                                <HomeProductCard product={product} isFavProduct={isFavProduct}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )
            }
            {
                !loading && !error && (!products || products?.length < 0) && <h4 className="notFound">No Products found</h4>
            }
            {
                !loading && error && !products && <h4 className="error">Something went wrong</h4>
            }
        </Container>
    )
}

export default HomeProducts
