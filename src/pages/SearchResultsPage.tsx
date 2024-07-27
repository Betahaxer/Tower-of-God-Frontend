import { Key, useEffect, useRef, useState } from 'react'
import {
  AbsoluteCenter,
  Box,
  Center,
  Divider,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Product from '../components/Product'
import axios, { AxiosError } from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import FilterSortMenu from '../components/FilterSortMenu'
import { getTokens } from '../utils/storage'
import LoadingPage from '../components/LoadingPage'
import { useAuth } from '../contexts/AuthContext'

const SearchResultsPage = () => {
  interface FilterList {
    [key: string]: (string | boolean | null)[] // Each key maps to a list of lists of strings
  }
  interface Filters {
    q: string
    category: string
    ordering: string
    brand: string
    price: string
    review_date: string
  }
  interface Product {
    [key: string]: any
  }
  interface ErrorResponse {
    status: number
    data: {
      message: string
    }
  }
  const categoryList = [
    'earbuds',
    'keyboard',
    'laptop',
    'mouse',
    'phone',
    'monitor',
    'speaker',
    'television',
  ]

  const location = useLocation()
  const navigate = useNavigate()
  const { checkExpiryAndRefresh, isLoggedIn } = useAuth()
  // filters contain the current filters applied by user
  const initialFilters: Filters = {
    q: location.state?.query || '',
    category: location.state?.category || '',
    ordering: '',
    brand: '',
    price: '',
    review_date: '',
  }

  // results store all the product details
  const [results, setResults] = useState<Product[]>([])
  // filterList for the list of possible filters
  const [filterList, setFilterList] = useState<FilterList>({})
  const isFirstRender = useRef(true)
  // nextUrl and hasMore for infinite scrolling
  // nextUrl to get the next page of results
  // hasMore indicates if there are more results, used to render the loading screen
  const [nextUrl, setNextUrl] = useState()
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const [loading, setLoading] = useState(true)
  const [wishlist, setWishlist] = useState<Product[]>([])
  const toast = useToast()

  // Function to update filters
  const updateFilter = (key: keyof Filters, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }))
  }
  const handleSearch = async () => {
    const queryParams = new URLSearchParams(
      filters as unknown as Record<string, string>,
    ).toString()
    console.log(queryParams)
    try {
      const response = await axios.get(`/api/products?${queryParams}`)
      setResults(response.data.results.products)
      setFilterList(response.data.results.unique_filters)
      setNextUrl(response.data.next)
      setHasMore(response.data.next !== null)
      console.log('results: ', response.data)
    } catch (error) {
      console.error('Error searching for products', error)
    }
  }
  const fetchMoreData = async () => {
    try {
      const url =
        nextUrl ||
        `/api/products?${new URLSearchParams(
          filters as unknown as Record<string, string>,
        ).toString()}`
      const axiosConfig = nextUrl ? { baseURL: '' } : {}
      const response = await axios.get(url, axiosConfig)
      const newResults: Product[] = response.data.results.products
      setResults((prevResults) => [...prevResults, ...newResults])
      setNextUrl(response.data.next)
      setHasMore(response.data.next !== null)
      //console.log(response.data);
      //console.log(response.data.next);
    } catch (error) {
      console.error('Error fetching more products', error)
    }
  }

  const toggleWishlistItem = async (product: Product) => {
    // we only have itemID here, and we want to find the wishlistID of the item
    console.log('toggle: ', product)
    try {
      await checkExpiryAndRefresh()
      const { accessToken, refreshToken } = getTokens()
      if (inWishlist(product.id, product.category)) {
        // item is in wishlist, delete it
        const wishlistID = findIdInWishlist(product.id)
        await axios.delete(`/api/wishlist/${wishlistID}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        console.log(`Product with item id ${product.id} removed from wishlist.`)
      } else {
        // add product to wishlist
        // adding only needs the itemID aka object_id
        const response = await axios.post(
          '/api/wishlist/',
          {
            product_category: product.category,
            object_id: product.id,
          },
          {
            headers: {
              ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
              ...(refreshToken && { 'Refresh-Token': refreshToken }),
            },
          },
        )
        console.log(`Product with item id ${product.id} added to wishlist.`)
      }
    } catch (error) {
      console.error('Error toggling wishlist item:', error)
      const axiosError = error as AxiosError<ErrorResponse>
      if (axiosError.response) {
        if (axiosError.response.status === 409) {
          toast({
            title: 'Item is already in wishlist',
            status: 'error',
            duration: 2000,
          })
        } else if (axiosError.response.status === 401) {
          toast({
            title: 'Log in to add to wishlist',
            status: 'error',
            duration: 2000,
          })
          navigate('/login')
        }
      } else {
        toast({
          title: 'An error occurred',
          status: 'error',
          duration: 2000,
        })
      }
    }
  }
  // queries the entire wishlist from backend
  const getWishlist = async () => {
    let allItems: Product[] = []
    let page = 1
    const pageSize = 12
    let totalPages = 1
    let offset = 0
    try {
      await checkExpiryAndRefresh()
      const { accessToken } = getTokens()

      while (page <= totalPages) {
        const response = await axios.get(`/api/wishlist/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            offset: offset,
            page: page,
            page_size: pageSize,
          },
        })
        console.log('wishlist: ', response.data)
        allItems = allItems.concat(response.data.results)
        totalPages = Math.ceil(response.data.count / pageSize)
        page += 1
        offset += pageSize
      }
      setWishlist(allItems)
    } catch (error) {
      console.error('Request for wishlist failed', error)
    }
    setLoading(false)
  }
  // checks if the item with the id and category is in wishlist
  const inWishlist = (id: number, category: string) => {
    const result = wishlist.some((product: Product) => {
      return (
        product.object_id === id && product.content_object.category === category
      )
    })
    return result
  }
  // finds the wishlistID from objectID in wishlist
  const findIdInWishlist = (item_id: number): number | undefined => {
    const product: Product = wishlist.find(
      (product: Product) => product.object_id === item_id,
    ) as unknown as Product
    return product?.id
  }
  // reset filters if query changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
    } else {
      //reset to initial filters
      setFilters(initialFilters)
    }
  }, [location.state?.query])

  // async functions in useeffect can cause race conditions
  // however this is to fix the "No results found" showing for a split second
  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      setLoading(true)
      try {
        await handleSearch()
        await getWishlist()
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching data:', error)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()
    return () => {
      isMounted = false
    }
  }, [filters])

  return (
    <>
      <Stack
        direction="column"
        py={10}
        px={10}
        alignItems={'left'}
        spacing={10}
      >
        <FilterSortMenu
          categoryList={categoryList}
          filterList={filterList}
          updateFilter={updateFilter}
          filters={filters}
        ></FilterSortMenu>
      </Stack>
      <Stack direction="column" alignItems={'center'} spacing={10}>
        {loading && <LoadingPage></LoadingPage>}
        {!loading && results.length === 0 && (
          <Text fontSize="3xl" fontWeight="500" color="gray.500">
            {' '}
            No results found
          </Text>
        )}
        {!loading && Array.isArray(results) && results.length !== 0 && (
          <InfiniteScroll
            dataLength={results.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <Box py={10} display="flex" justifyContent="center">
                <Spinner size="xl" />
              </Box>
            }
            endMessage={
              <Box position="relative" padding="10">
                <Divider />
                <AbsoluteCenter bg="white" px="4">
                  End of Page
                </AbsoluteCenter>
              </Box>
            }
          >
            <SimpleGrid
              spacing={4}
              columns={{ base: 1, md: 2, lg: 3 }}
              px="10"
              py="1"
              //justifyItems="flex-end"
            >
              {/* only works on arrays, so have to check if array is provided */}

              {results.map((product: Product, index: number) => {
                return (
                  <Product
                    key={index}
                    productData={product}
                    heartFunction={async () => {
                      await toggleWishlistItem(product)
                      await getWishlist()
                    }}
                    filled={inWishlist(product.id, product.category)}
                  />
                )
              })}
            </SimpleGrid>
          </InfiniteScroll>
        )}
      </Stack>
    </>
  )
}

export default SearchResultsPage
