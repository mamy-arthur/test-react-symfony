<?php

namespace App\Controller;

use App\Document\Product;
use App\Services\ProductManager;
use FOS\RestBundle\Controller\ControllerTrait;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;

#[Route('/', name: 'api_')]
class ProductController
{
    use ControllerTrait;

    public function __construct(protected ProductManager $productManager)
    {}

    /**
     * Get all products
     *
     * @return Response
     */
    #[Rest\Get('/products')]
    public function getProducts(): Response
    {
        $products = $this->productManager->findAll();
        return $this->handleView($this->view($products));
    }

    /**
     * Create one product
     *
     * @param Request $request
     * @return Response
     */
    #[Rest\Post('/product/create')]
    public function createAction(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);
        if (!$data || !isset($data['name'], $data['price'], $data['quantity'])) {
            return $this->handleView($this->view([
                'error' => 'Invalid JSON data'
            ], Response::HTTP_BAD_REQUEST));
        }

        $this->productManager->createProduct($data);

        return $this->handleView($this->view([
            'message' => 'Produit créé avec succès'
        ], Response::HTTP_CREATED));
    }

    /**
     * Get one product
     *
     * @param Product $product
     * @return Response
     */
    #[Rest\Get('/product/{id}')]
    public function getAction(Product $product): Response
    {
        return $this->handleView($this->view($product, Response::HTTP_OK));
    }

    /**
     * Update one product
     *
     * @param Product $product
     * @param Request $request
     * @return Response
     */
    #[Rest\Put('/product/update/{id}')]
    public function updateAction(Product $product, Request $request): Response
    {
        if (!$product) {
            return $this->handleView($this->view([
                'error' => 'Produit non trouvé'
            ], Response::HTTP_NOT_FOUND));
        }
        $data = json_decode($request->getContent(), true);
        $this->productManager->updateProduct($product, $data);
        return $this->handleView($this->view($product, Response::HTTP_OK));
    }

    /**
     * Delete one product
     *
     * @param Product $product
     * @return Response
     */
    #[Rest\Delete('/product/delete/{id}')]
    public function deleteAction(Product $product): Response
    {
        if (!$product) {
            return $this->handleView($this->view([
                'error' => 'Produit non trouvé'
            ], Response::HTTP_NOT_FOUND));
        }
        $this->productManager->deleteProduct($product);
        return $this->handleView($this->view([
            'message' => 'Produit supprimé avec succès'
        ], Response::HTTP_NO_CONTENT));
    }
}