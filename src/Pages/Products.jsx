import React, { Suspense, useState, useRef, useEffect } from 'react';
import UseInfiniteProducts from '../utils/UseInfiniteProducts';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductTemplate from '../components/ProductTemplate';
import cafforaBanner from '../assets/images/CafforaBannerMobile.jpg';
import beansImg from '../assets/images/coffeeBgImgProducts.png';
import './scrollbar.css';
const Products = () => {
    const [activeCategory, setActiveCategory] = useState(null);
    const { products, hasMore, fetchMoreProducts } = UseInfiniteProducts(activeCategory);

    const categories = [
        { name: 'Coffee Beans', value: 'beans' },
        { name: 'Insta Pour', value: 'InstaPour' },
        { name: 'Coffee Equipments', value: 'equipments' },
        { name: 'Coffees', value: 'coffee' },
        { name: 'Glasses & Mugs', value: 'mugs-and-glasses' }
    ];

    // New state and ref for draggable functionality
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const categoriesRef = useRef(null);

    // Mouse events for dragging
    const handleMouseDown = (e) => {
        if (window.innerWidth >= 954) return;
        setIsDragging(true);
        setStartX(e.pageX - categoriesRef.current.offsetLeft);
        setScrollLeft(categoriesRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        if (window.innerWidth >= 954) return;
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        if (window.innerWidth >= 954) return;
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (window.innerWidth >= 954 || !isDragging) return;
        e.preventDefault();
        const x = e.pageX - categoriesRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Multiplier for faster scroll
        categoriesRef.current.scrollLeft = scrollLeft - walk;
    };
    
    // Touch events for mobile
    const handleTouchStart = (e) => {
        if (window.innerWidth >= 954) return;
        setIsDragging(true);
        setStartX(e.touches[0].pageX - categoriesRef.current.offsetLeft);
        setScrollLeft(categoriesRef.current.scrollLeft);
    };
    
    const handleTouchEnd = () => {
        if (window.innerWidth >= 954) return;
        setIsDragging(false);
    };

    const handleTouchMove = (e) => {
        if (window.innerWidth >= 954 || !isDragging) return;
        const x = e.touches[0].pageX - categoriesRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        categoriesRef.current.scrollLeft = scrollLeft - walk;
    };
    

    return (
        <div className='overflow-x-hidden min-h-[100vh] relative z-21 bg-[#FCF7E6]'>
            <div className='py-20'>
                <video className='w-full object-fill hidden md:block md:h-[50vh] lg:h-[70vh] xl:h-[75vh]' src='https://ik.imagekit.io/hkhrhari/Caffora-Site-Videos/cafforaVideo.mp4?updatedAt=1758371552742' muted loop autoPlay />
                <img src={cafforaBanner} alt='' className='w-full h-[50vh] sm:h-[60vh] md:hidden' />
            </div>

            {/* Category Bar */}
            <div
                ref={categoriesRef}
                className='mb-5 flex justify-start min-[954px]:justify-center gap-4 py-4 px-4 overflow-x-auto w-full font-black category-container '
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
                style={{ cursor: window.innerWidth < 954 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
            >
                <button
                    className={`flex-shrink-0 px-4 py-2 rounded-full border ${!activeCategory ? 'bg-[#491f1f] text-white' : 'bg-[#e2d5ab] text-black'} cursor-pointer`}
                    onClick={() => setActiveCategory(null)}
                >
                    All
                </button>
                {categories.map(category => (
                    <button
                        key={category.value}
                        className={`flex-shrink-0 px-4 py-2 rounded-full border ${activeCategory === category.value ? 'bg-[#491f1f] text-white' : 'bg-[#e2d5ab] text-black'} cursor-pointer` }
                        onClick={() => setActiveCategory(category.value)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            <InfiniteScroll
                key={activeCategory}
                className='flex justify-center flex-col items-center'
                dataLength={products.length}
                next={fetchMoreProducts}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! you have seen it all</b>
                    </p>
                }
            >
                <div className='flex flex-wrap justify-center max-w-[1450px]'>
                    {products.map((product) => (
                        <Suspense
                            key={product.id}
                            fallback={
                                <h1 className='text-center text-6xl text-yellow-300'>Loading...</h1>
                            }>
                            <ProductTemplate product={product} />
                        </Suspense>
                    ))}
                </div>
            </InfiniteScroll>

         
        </div>
    );
};

export default Products;


{/* <div className='absolute top-[1100px] left-10 z-10 w-40 h-40'>
    
                <img src={beansImg} />
            </div> */}