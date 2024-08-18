import { useQuery } from "@tanstack/react-query";


import { HashLoader } from "react-spinners";

import { useEffect, useState } from "react";

import useAxiosPublic from "../../Utils/useAxiosPublic";
import Card from "../Card/Card";
import NoData from "../NoData/NoData";



const AllProducts = () => {

    const [brandName, setBrandName] = useState('');
    const [category, setCategory] = useState('');
    const [sorting, setSorting] = useState('');
    const [search, SetSearch] = useState('');
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(500000);
    const axiosPublic = useAxiosPublic();
    const [page, setPage] = useState(1);
    const [limit] = useState(6);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerpage = 6;

    const numberOfPages = Math.ceil(count / itemsPerpage);
    const pages = [];


    for (let i = 1; i <= numberOfPages; i++) pages.push(i);


    useEffect(() => {
        axiosPublic.get(`/productCount?search=${search}&category=${category}&brandName=${brandName}&min=${min}&max=${max}`)
            .then(data => setCount(data.data.length))
    }, [search, category, brandName, min, max])


    const { data: products = [], isLoading } = useQuery({
        queryKey: ['all-products-lists', page, limit, search, sorting, category, brandName, min, max],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/products?page=${page}&limit=${limit}&search=${search}&sorting=${sorting}&category=${category}&brandName=${brandName}&min=${min}&max=${max}`);
            return data
        }
    })



    const handlePageChange = (newPage) => {
        setPage(newPage);
        setCurrentPage(newPage)
    }

    const handleSearch = (e) => {
        e.preventDefault();
        SetSearch(e.target.search.value);
    }
    const handleSelectCategory = e => {
        setCategory(e.target.value);
    }
    const handlePriceSearch = e => {
        e.preventDefault();
        setMin(e.target.min.value);
        setMax(e.target.max.value);
    }
    const handleBrand = e => {
        setBrandName(e.target.value);
    }
    const handleSelectSort = e => {
        setSorting(e.target.value)
    }


    if (isLoading) {
        return (
            <div>
                <div className="flex justify-center items-center h-screen">
                    <HashLoader color="blue" />
                </div>
            </div>
        )
    }
    return (
        <div className="mt-[60px] container mx-auto">


            <div className="flex gap-5 flex-wrap items-center justify-center">
                <div>
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row  items-center justify-center gap-5">
                        <div className="border flex border-blue-300">
                            <input name="search" className="w-full py-3 px-5 outline-none" type="text" placeholder="product name" />
                            <button className="btn bg-blue-500 rounded-none border-none text-white text-lg hover:bg-blue-800">Search</button>
                        </div>
                    </form>
                </div>

                <div className=" flex flex-col items-center gap-5 text-lg">
                    <select onChange={handleSelectSort} value={sorting} className="py-3 px-5 bg-blue-500 text-white ">
                        <option value="">Sort Your Products</option>
                        <option value="newProduct">All New Products</option>
                        <option value="asc">Low to High</option>
                        <option value="dsc">High to Low</option>
                    </select>
                </div>

                <div className="">

                    <select onChange={handleSelectCategory} value={category} className="py-3 px-5 text-lg bg-blue-500 text-white ">
                        <option value="">Select Your Category</option>
                        <option value="Clothes">Clothes</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Jerseys">Jerseys</option>
                        <option value="BeautyProducts">Beauty Products</option>

                    </select>
                </div>

                <div className="">
                    <select onChange={handleBrand} value={brandName} className="py-3 px-5 bg-blue-500 text-lg text-white ">
                        <option value="">Select a Brand</option>
                        <option value="zara">Zara</option>
                        <option value="nike">Nike</option>
                        <option value="aldo">Aldo</option>
                        <option value="adidas">Adidas</option>
                        <option value="apple">Apple</option>
                    </select>
                </div>

                <div className="">
                    <form onSubmit={handlePriceSearch} className="  flex flex-wrap justify-center gap-5">
                        <div className="w-32">

                            <input name="min" className="w-full py-3 px-5 border-blue-300 border outline-none" type="number" placeholder="Min" />
                        </div>
                        <div className="w-32">

                            <input name="max" className="w-full py-3 px-5 border-blue-300 border outline-none" type="number" placeholder="Max" />
                        </div>
                        <button className="btn bg-blue-500 border-none rounded-none  text-white text-lg hover:bg-blue-800">Search</button>
                    </form>
                </div>


            </div>


            {
                products?.length > 0 ? <div className="pt-10">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 min-h-screen">
                        {
                            products?.map(product => <Card key={product._id} product={product}></Card>)
                        }
                    </div>
                    <div className="flex items-center mt-14">
                        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="btn mr-2 rounded-none">Pre</button>

                        <span className="flex gap-4 ">
                            {
                                pages?.map((pageNo) => <button onClick={() => {
                                    setCurrentPage(pageNo)
                                    setPage(pageNo)
                                }} key={pageNo} className={`btn px-5 border-0 rounded-none ${currentPage === pageNo ? 'bg-gray-400  text-white' : 'text-black'}   `}>{pageNo}</button>)
                            }
                        </span>
                        <button onClick={() => handlePageChange(page + 1)} disabled={currentPage === pages.length} className="btn rounded-none ml-2">Next</button>
                    </div>
                </div> : <NoData></NoData>
            }

        </div>
    );
};

export default AllProducts;