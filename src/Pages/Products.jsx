import React, { Suspense } from 'react'
import UseInfiniteProducts from '../utils/UseInfiniteProducts'
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductTemplate from '../components/ProductTemplate';
import cafforaBanner from '../assets/images/CafforaBannerMobile.jpg'
const Products = () => {

    const { products, hasMore, fetchProducts } = UseInfiniteProducts();
    console.log(products.length)
    return (
        <div className='overflow-x-hidden min-h-[100vh] relative z-21  bg-[#FCF7E6]'>
            <div className='py-20'>
                <video className='w-full object-fill hidden md:block md:h-[50vh] lg:h-[70vh] xl:h-[75vh]' src='https://ik.imagekit.io/hkhrhari/Caffora-Site-Videos/cafforaVideo.mp4?updatedAt=1758371552742' muted loop autoPlay />
                <img src={cafforaBanner} alt='' className='w-full h-[50vh] sm:h-[60vh] md:hidden'/>
            </div>
            <InfiniteScroll
                className=''
                dataLength={products.length}
                next={fetchProducts}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! you have  seen it all</b>
                    </p>
                }
            >
                <div className='flex flex-wrap justify-center   '>
                    {products.map((product) => {
                        return <Suspense
                            key={product.id}
                            fallback={
                                <h1 className='text-center text-6xl text-yellow-300'>Loading...</h1>
                            }>
                            <ProductTemplate product={product} />
                        </Suspense>
                    })}
                </div>
            </InfiniteScroll>
        </div>
    )
}

export default Products 