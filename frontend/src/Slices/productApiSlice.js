import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        getProducts : builder.query({
            query :({keyword,pageNumber})=>({
                url: PRODUCTS_URL,
                params:{
                    keyword,
                    pageNumber, 
                }
            }),
            keepUnusedDataFor : 5
        }),
        getProductDetails : builder.query({
            query : (productId)=>({
                url:`${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor:5,
            providesTags:['Products']
        }),
        createProduct:builder.mutation({
            query:()=>({
                url:PRODUCTS_URL,
                method:'POST'
            }),
            invalidatesTags:['Products'],
        }),
        updateProduct :builder.mutation({
            query:(data) =>({
                url:`${PRODUCTS_URL}/${data.productId}`,
                method:'PUT',
                body:data,
            }),
            invalidatesTags:['Products']
        }),

        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `/api/upload`,
                method: 'POST',
                body: data,
            }),
            }),
        
        deleteProduct: builder.mutation({
                query: (productId) => ({
                    url: `${PRODUCTS_URL}/${productId}`,
                    method: 'DELETE',
                }),
                providesTags: ['Product'],
            }),
        
        createReview :builder.mutation({
            query:(data)=>({
                url:`${PRODUCTS_URL}/${data.productId}/reviews`,
                method:'POST',
                body:data,
            })
        }),
        getTopProducts: builder.query({
            query:()=>({
                url:`${PRODUCTS_URL}/top`
            })
        })
    }),
});

export const {useGetProductsQuery , useGetProductDetailsQuery ,useCreateProductMutation, useUpdateProductMutation, useUploadProductImageMutation,useDeleteProductMutation,useCreateReviewMutation} = productsApiSlice;