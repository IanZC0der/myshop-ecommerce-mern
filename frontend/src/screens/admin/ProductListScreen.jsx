import { LinkContainer } from "react-router-bootstrap"
import {Table, Button, Row, Col} from "react-bootstrap"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { FaEdit,  FaTrash, FaPlus} from "react-icons/fa"
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from "../../slices/productsApiSlice"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import Paginate from "../../components/Paginate"
const ProductListScreen = () => {
    const { pageNumber } = useParams()
    const {data, error, isLoading, refetch} = useGetProductsQuery({pageNumber})
    const [createProduct, {isLoading: loadingCreate}] = useCreateProductMutation()
    const [deleteProduct, {isLoading: loadingDelete}] = useDeleteProductMutation()

    const createProductHandler = async () => {
        if(window.confirm('Creating a new product?')){
            try {
                await createProduct()
                refetch()
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }

    const deleteProductHandler = async (id) => {
        if(window.confirm('Deleting the product, are you sure?')){
            try {
                await deleteProduct(id)
                toast.success('Product deleted successfully')
                refetch()
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }

    return (
        <>

            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-end">
                        <Button className="my-3" onClick={createProductHandler}>
                            <FaPlus />Create Product
                        </Button>
                </Col>
            </Row>
            {loadingCreate && <Loader />}
            {loadingDelete && <Loader />}
            {isLoading ? (<Loader/>) : error ? (<Message variant="danger">{error.data.message}</Message>) : (
                <>
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th> 
                            <th>Category</th>
                            <th>Brand</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td> 
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant="light" className="btn-sm">
                                            <FaEdit/>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" className="btn-sm" onClick={ () => deleteProductHandler(product._id)}>
                                        <FaTrash/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate pages={data.pages} page={data.page} isAdmin={true} />
                </>
            )}
        </>
    )
}

export default ProductListScreen